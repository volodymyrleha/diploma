import React from 'react';
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { trainModel } from "../model";
import { suggestTaskClass } from '../model';
import { CONFIDENCE_THRESHOLD } from '../model';

export default function useModel(initTab) {
    const [model, setModel] = React.useState(null);
    const [encoder, setEncoder] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const loadModel = async () => {
                const sentenceEncoder = await use.load();
                const trainedModel = await trainModel(sentenceEncoder);
                setEncoder(sentenceEncoder);
                setModel(trainedModel);
            };
            await loadModel();
        })();
    }, []);

    return {
        suggestTaskClass: async (text) => {
            if (!model)
                return;

            if (!encoder)
                return;

            return await suggestTaskClass(
                model,
                encoder,
                text,
                CONFIDENCE_THRESHOLD
            );
        }
    }
}