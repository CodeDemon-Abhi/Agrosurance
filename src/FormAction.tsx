import FormButton from "./FormButton"

const FormAction= () => {

const myAction= async (formData:any)=>{

await new Promise ((resolve)=>setTimeout(resolve,2000))

const data={
  name:formData.get("name"),
  email:formData.get("email")
}
console.log(data)
}

  return (
    <>
    <form action={myAction}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" required />
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" required />

      <FormButton/>

    </form>
</>
  )
}

export default FormAction