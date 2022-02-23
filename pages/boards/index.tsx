import type { NextPage } from 'next'
import type { Board } from '@frontend/services/boardService'
import withAuthenticationHOC from '@frontend/HOC/withAuthenticationHOC'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { fetchBoards } from '@frontend/services/boardService'

const defaultImageUrl = "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/720x960/f7ba69456afe32f1b6bcd6b6303a5aec/photo-1617933640399-78563c6db72f.jpg"

const BoardsPage: NextPage = () => {
  const router = useRouter()
  const [boards, setBoards] = useState<Board[]>([])

  useEffect(() => {
    fetchBoards().then(resp => {
      const { data } = resp
      setBoards(data.data)
    }).catch(err => console.log({err}))
  }, [router])

  function onNavigateToBoardDetail(boardId: number) {
    router.push("/boards/" + boardId)
  }

  return (
    <div style={{ padding: 15 }}>
      <Grid container spacing={2}>
        {
          boards.map((board: Board) => (
            <Grid item key={board.id} xs={4}>
              <Card onClick={e => onNavigateToBoardDetail(board.id)} style={{position: "relative"}} className="pointer">
                <CardMedia
                  component="img"
                  height="150"
                  image={defaultImageUrl}
                />
                <Typography style={{position: "absolute", top: 0, padding: "10px", fontWeight: "bold"}} gutterBottom variant="h6" component="div" color={"white"}>
                  {board.name}
                </Typography>
              </Card>
            </Grid>

          ))
        }
      </Grid>



    </div>
  )
}

export default withAuthenticationHOC(BoardsPage)
