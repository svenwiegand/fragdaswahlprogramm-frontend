import {cloneElement, isValidElement, ReactNode} from "react"
import {PartySelector} from "../chat/PartySelector.tsx"
import {PartiesDetails} from "./PartiesDetails.tsx"

type Replacements = Record<string, ReactNode>

const replacements: Replacements = {
    "parties": <PartySelector readonly={true}/>,
    "partiesDetails": <PartiesDetails/>,
}

export function ParagraphWithDynamicContent({children}: { children: ReactNode }) {
    return <p>{replaceDynamicKeys(children, replacements)}</p>
}

function replaceDynamicKeys(node: ReactNode, replacements: Replacements): ReactNode {
    if (typeof node === "string") {
        const regex = /\{\{(\w+)}}/g;
        const parts: ReactNode[] = [];
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(node)) !== null) {
            const [placeholder, key] = match;
            const startIndex = match.index;

            // insert text before {{key}}
            if (startIndex > lastIndex) {
                parts.push(node.substring(lastIndex, startIndex));
            }

            // append replacement key if any
            if (replacements[key]) {
                parts.push(cloneElement(replacements[key] as React.ReactElement, { key: parts.length }));
            } else {
                // re append placeholder if there is no replacement
                parts.push(placeholder);
            }

            lastIndex = regex.lastIndex;
        }

        // append remaining text
        if (lastIndex < node.length) {
            parts.push(node.substring(lastIndex));
        }

        return parts.length === 1 ? parts[0] : parts; // Falls nur ein Teil, direkt zurückgeben
    }

    if (Array.isArray(node)) {
        return node.map((child) => replaceDynamicKeys(child, replacements));
    }

    if (isValidElement(node)) {
        return cloneElement(node, {
            ...node.props,
            children: replaceDynamicKeys(node.props.children, replacements),
        });
    }

    return node;
}
