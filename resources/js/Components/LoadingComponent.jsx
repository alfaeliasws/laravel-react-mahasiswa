//COMPONENT

import { ContentParagraphBlack } from "./Paragraph";

//loading component with bounce animation
export default function LoadingComponent() {
    return (
        <div className="flex  justify-center h-[200px] items-center transition-all ease-in-out duration-500">
            <ContentParagraphBlack className="text-center animate-bounce text-2xl">Loading...</ContentParagraphBlack>
        </div>
    )
}
