import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";




export const ErrorCard = () => {
  return (
    <CardWrapper
        headerLabel="Oops!😫 Something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        title="404 Page"
    >
        <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive text-3xl"/>
        </div>
    </CardWrapper>
)
}
