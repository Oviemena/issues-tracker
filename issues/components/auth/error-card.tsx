import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";




export const ErrorCard = () => {
  return (
    <CardWrapper
        headerLabel="Oops!😫 Something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
    >
        <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive text-3xl"/>
        </div>
    </CardWrapper>
)
}
