import React, { ComponentType, createContext, useContext } from "react";

export interface CreateRootOptions {
    separator?: string
}

export interface WithPathProps {
    id: string;
    usePath: () => string
}

const defaultOptions: Required<CreateRootOptions> = Object.freeze({
    separator: "."
});

export const createRoot = (rootPath: string, options?: CreateRootOptions) => {
    const { separator } = {
        ...defaultOptions,
        ...options
    };
    const Context = createContext(rootPath);
    const usePath = () => { return useContext(Context); };
    const withPath = function <P extends WithPathProps>(WrappedComponent: ComponentType<P>) {
        const ComponentWithPath: React.FC<Omit<P, "usePath">> = (props) => {
            const contextPath = useContext(Context);
            const pathFromRoot = contextPath + separator;

            const getId = () => {
                if (props.id.startsWith(pathFromRoot)) {
                    warn("idがパスで始まるのを検出しました。パスの重複を避けるためにid中のパス部分を削除してからパスに連結します。パス：" + pathFromRoot + "/id：" + props.id);
                    return props.id.replace(pathFromRoot, "");
                } else {
                    return props.id;
                }
            };

            return <Context.Provider value={pathFromRoot + getId()}>
                <WrappedComponent {...({ ...props, usePath } as P)} />
            </Context.Provider>;
        };
        ComponentWithPath.displayName = "ComponentWithPath(" + (WrappedComponent.displayName || WrappedComponent.name || "Component") + ")";
        return ComponentWithPath;
    };
    return {
        withPath,
    };
};

const warn = (...args: Parameters<typeof console.warn>) => {
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(...args);
    }
};
