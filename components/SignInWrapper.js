import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const SignInWrapper = ({ children }) => {
  const router = useRouter();

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
        {
          identifier: email,
          password,
        }
      );

      const { jwt, user } = response.data;

      if (user.confirmed) {
        localStorage.setItem("token", jwt);
        router.push("/export-property");
      } else {
        toast.error("Error submitting");
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return <div>{children(signIn)}</div>;
};

export default SignInWrapper;
