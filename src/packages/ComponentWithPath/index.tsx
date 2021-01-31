import React, { ComponentType, createContext, useContext } from "react";

export interface CreateRootOptions {
  splitter?: string
}

const defaultOptions: Required<CreateRootOptions> = {
  splitter: "_"
};


export const createRoot = (rootPath: string, options?: CreateRootOptions) => {
  const { splitter } = {
    ...defaultOptions,
    ...options
  };
  const Context = createContext(rootPath);
  const withPath = function <P extends WithPathProps>(WrappedComponent: ComponentType<P>) {
    const ComponentWithPath: React.FC<P> = (props) => {
      return <Context.Consumer>
        {
          path => {
            return <Context.Provider value={path + splitter + props.id}>
              <WrappedComponent {...props} />
            </Context.Provider>;
          }
        }
      </Context.Consumer>;
    };
    ComponentWithPath.displayName = `ComponentWithPath(${getDisplayName(WrappedComponent)})`;
    return ComponentWithPath;
  };
  const usePath = () => { return useContext(Context); };
  return {
    withPath,
    usePath
  };
};
export interface WithPathProps {
  id: string;
}

const getDisplayName = function <P>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
