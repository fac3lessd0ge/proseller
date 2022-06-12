import React  from "react";

export default function useUpdateEffect(callback, dependencies) {
    const firstRender = React.useRef(true);

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return
        }

        return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)
}