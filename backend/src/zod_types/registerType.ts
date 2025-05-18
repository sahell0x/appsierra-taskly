import z from "zod";

const passwordValidation = new RegExp( 
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const resgisterType = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordValidation),
  name : z.string().min(2),
  country:z.string()
});

export default resgisterType;
