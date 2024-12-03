import { useParams } from "react-router";

export default function ViewEventPage() {
  let {id} = useParams();

  return (
    <div className='text-white'>
      {id}
    </div>
  )
  
}