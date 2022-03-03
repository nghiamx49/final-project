import { Button } from "@nextui-org/react"
import { FC, ReactChild } from "react"

interface Props {
    children?: ReactChild
}

const ActiveProfileTab: FC<Props> = ({children}) => {
    return (
        <Button bordered color="gradient">{children}</Button>
    )
}

export default ActiveProfileTab;