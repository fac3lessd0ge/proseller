import React, { useEffect, useRef } from "react";

export default function useUpdateEffect(callback, dependencies) {
    const firstRender = useRef(true);

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return
        }

        return callback();
    }, dependencies)
}