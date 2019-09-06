import { GraphDataTypes } from '../models/graph.data.types';

export class SocketTypeMatcher {
    private static readonly matches: { type: GraphDataTypes, matches: GraphDataTypes[] }[] = [
        {
            type: GraphDataTypes.Number,
            matches: [
                GraphDataTypes.Number,
            ]
        },
        {
            type: GraphDataTypes.String,
            matches: [
                GraphDataTypes.String,
            ]
        },
        {
            type: GraphDataTypes.Trigger,
            matches: [
                GraphDataTypes.Trigger,
            ]
        },
        {
            type: GraphDataTypes.Boolean,
            matches: [
                GraphDataTypes.Boolean,
            ]
        },
    ];

    public static match(a: GraphDataTypes, b: GraphDataTypes) {
        return a === GraphDataTypes.Any ||
            b === GraphDataTypes.Any ||
            SocketTypeMatcher.matches.find(t => t.type === a).matches.includes(b);
    }
}
