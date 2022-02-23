import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type TaskProps = {
	title: string
	body: string | null
	index: number
}

export default function Task(props: TaskProps) {
	const { title } = props
	return (
		<Card sx={{ maxWidth: 300 }} style={{ marginTop: 10, marginBottom: 10 }}>
			{/* <CardMedia
				component="img"
				height="auto"
				image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
				alt="green iguana"
			/> */}
			<CardContent>
				<Typography variant="subtitle2" component="div">
					{title}
				</Typography>
			</CardContent>
		</Card>
	);
}
