import { challengeOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import { Card } from "./card"

type Props = {
    options: typeof challengeOptions.$inferSelect[]
    onSelect: (id: number) => void
    status: "correct" | "wrong" | "none"
    selectedOptions?: number
    disabled?: boolean
    type: typeof challenges.$inferSelect["type"]
}

export const Challenge = ({ options, onSelect, status, disabled, selectedOptions, type}: Props) => {

    return (
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>
            {options.map((option, i) => (
                <Card 
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    shortcut={`${i + 1}`}
                    selected={selectedOptions === option.id}
                    onClick={() => onSelect(option.id)}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    status={status}
                    type={type}
                />
            ))}
        </div>
    )
}