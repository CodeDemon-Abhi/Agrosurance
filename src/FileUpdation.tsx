import { useState } from "react"
import { FaCamera } from "react-icons/fa"
const FileUpdation = () => {

    const[logoUrl,setLogoUrl]=useState("")
    // const[banner,setBanner]=useState("")

    const handleChange=(e)=>{
        const file=e.target.files[0]
        if(file){
    const url=URL.createObjectURL(file)
    setLogoUrl(url)
        }
    }
  return (
<>
<label htmlFor="logo">
    <FaCamera size={24} />
</label>
<input type="file" name="logo" id="logo"
className="hidden"
onChange={(e)=>handleChange(e)}
/>

<img src={logoUrl}
className="w-40 h-40 rounded-full"/>
</>

  )
}

export default FileUpdation