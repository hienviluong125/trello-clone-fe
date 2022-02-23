import type { NextPage } from 'next'
import withAuthenticationHOC from '@frontend/HOC/withAuthenticationHOC'
import Board from '@frontend/components/board/index'
import { useRouter } from 'next/router'

const BoardPage: NextPage = () => {
  const router = useRouter()
  const { boardId } = router.query

  if (boardId) return <Board boardId={boardId as string} />

  return null
}

export default withAuthenticationHOC(BoardPage)
