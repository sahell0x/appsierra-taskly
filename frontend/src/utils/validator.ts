import z from "zod";

export const emailValidator = (email:string)=>{
    const emailSchema = z.string().email();
    const {success} = emailSchema.safeParse(email);

    if(success){
        return true;
    }
    return false;

};

export const passwordValidator = (password:string)=>{
    const passwordValidation = new RegExp( 
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      );

      const passwordSchema = z.string().regex(passwordValidation);

      const {success} = passwordSchema.safeParse(password);

      if(success){
        return true;
      }
      return false;

}