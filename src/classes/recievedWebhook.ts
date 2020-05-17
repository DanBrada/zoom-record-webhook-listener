export class ZoomMediaWebHookData{
	event: string
	payload:{
		account_id: string
		uuid: string,
		host_id: string,
		topic: string,
		type: number,
		start_time: string,
		duration: number,
		share_url: string
		total_size: string
		recording_count: number
		recording_files: [
			{
				id: string
				meeting_id: string
				recording_start: string
				recording_end: string
				file_type: string
				file_size: number
				play_url: string
				download_url: string
				status: string
				recording_type: string
			}
		]
	}
}
