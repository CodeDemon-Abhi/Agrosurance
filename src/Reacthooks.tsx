import { useForm,SubmitHandler } from "react-hook-form"
const Reacthooks = () => {
interface datas{
  email:string,
  name:string,
  password:string
}

  const{
register,
handleSubmit,
formState:{errors,isSubmitting}
  }=useForm<datas>()

  const ClickHandler:SubmitHandler<datas>=()=>{
if(errors){
  console.log(errors)
}
 alert("Form Submitted")
  }

  return (

    <>
    <h2>Form Submission 👇</h2>

    <div>

      <label htmlFor="name">Enter Name </label>
      <input type="text" id="name" {...register('name',{required:"Name is required"})} /> 
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <label htmlFor="email">Enter E-mail</label>
      <input type="text" id="email" {...register('email',{required:"Email is required",pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address"
      }})} />  
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        </div>
    <button onClick={handleSubmit(ClickHandler)} disabled={isSubmitting}>Submit</button>
    </>

  )
}

export default Reacthooks