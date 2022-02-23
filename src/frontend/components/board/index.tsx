import React, { Component, useEffect, useState } from "react";
import type { DropResult, OnDropCallback } from "react-smooth-dnd";
import type { List } from "@frontend/services/listService"
import { Typography } from "@mui/material"
import { Container as ReactSDnDContainer, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "../../../../pages/utils";
import { fetchListByBoardId, swapListOrder } from "@frontend/services/listService"
import Task from "./task"
import { swapTaskOrder } from "@frontend/services/taskService"


type BoardProps = {
  boardId: string
}

const Board = (props: BoardProps) => {
  const [boardLists, setBoardLists] = useState<List[]>([])
  const [removedTaskId, setRemovedTaskId] = useState<number | null>(null)
  const [addedTaskId, setAddedTaskId] = useState<number | null>(null)

  useEffect(() => {
    fetchListByBoardId(parseInt(props.boardId)).then(res => {
      const { data } = res
      setBoardLists(data.data)
    }).catch(err => {
      console.log({ err })
    })
  }, [props])

  useEffect(() => {
    if (removedTaskId !== null && addedTaskId !== null) {
      console.log({removedTaskId, addedTaskId})
      swapTaskOrder(removedTaskId, addedTaskId)
        .catch(err => console.log({err}))
        .finally(() => {
          setAddedTaskId(null)
          setRemovedTaskId(null)
        })
    }
  }, [removedTaskId, addedTaskId])

  return (
    <div className="board-container">
      <ReactSDnDContainer
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'cards-drop-preview'
        }}
      >
        {boardLists.map(list => {
          return (
            <Draggable key={list.id}>
              <div className="card-list-container">
                <div className="card-column-header column-drag-handle">
                  <Typography variant="subtitle2" component="span" sx={{ color: "#5e6c84" }}>
                    {list.name}
                  </Typography>
                </div>

                <ReactSDnDContainer
                  orientation="vertical"
                  groupName="col"
                  // onDragStart={e => console.log("drag started", e)}
                  // onDragEnd={e => console.log("drag end", e)}
                  // onDrop={e => console.log("on drop", e)}
                  // onDropReady={e => console.log("on drop ready", e)}
                  onDrop={(e: DropResult) => onCardDrop(list.id, e)}
                  getChildPayload={index =>
                    getCardPayload(list.id, index)
                  }
                  dragClass="card-ghost"
                  dropClass="card-ghost-drop"
                  // onDragEnter={() => { console.log("drag enter:", column.id); }}
                  // onDragLeave={() => { console.log("drag leave:", column.id); }}
                  // onDropReady={p => console.log('Drop ready: ', p)}
                  dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'drop-preview'
                  }}
                // dropPlaceholderAnimationDuration={200}
                >
                  {list.tasks.map(task => {
                    return (
                      <Draggable key={task.id}>
                        <Task title={task.title} body={task.body} index={task.index} />
                      </Draggable>
                    );
                  })}
                </ReactSDnDContainer>
              </div>
            </Draggable>
          );
        })}
      </ReactSDnDContainer>
    </div>
  );


  function getCardPayload(columnId: number, index: number) {
    return boardLists.filter(l => l.id === columnId)[0].tasks[
      index
    ];
  }

  function onColumnDrop(dropResult: DropResult) {
    if (dropResult.addedIndex === dropResult.removedIndex) {
      return
    }

    let addedList = boardLists.find((list, idx) => idx === dropResult.addedIndex)
    let removedList = boardLists.find((list, idx) => idx === dropResult.removedIndex)

    if (addedList && removedList) {
      swapListOrder(parseInt(props.boardId), removedList.id, removedList.index, addedList.id, addedList.index)
        .then(resp => { })
        .catch(err => console.log({ err }))
      let copyBoardList = [...boardLists]
      copyBoardList = applyDrag(copyBoardList, dropResult);
      setBoardLists(copyBoardList);
    }
  }

  function onCardDrop(columnId: number, dropResult: DropResult) {
    if (dropResult.removedIndex !== null) {
      setRemovedTaskId(columnId)
    }

    if (dropResult.removedIndex !== null) {
      setAddedTaskId(columnId)
    }

    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let copyBoardList = [...boardLists]
      const column = copyBoardList.filter(p => p.id === columnId)[0];
      const columnIndex = copyBoardList.indexOf(column);
      const newColumn = Object.assign({}, column);
      newColumn.tasks = applyDrag(newColumn.tasks, dropResult);
      copyBoardList.splice(columnIndex, 1, newColumn);
      setBoardLists(copyBoardList)
    }
  }
}

export default Board
