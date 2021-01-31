import React, { ComponentType, createContext, useContext } from "react";

export interface CreateRootOptions {
  separator?: string
}

const defaultOptions: Required<CreateRootOptions> = {
  separator: "_"
};


export const createRoot = (rootPath: string, options?: CreateRootOptions) => {
  const { separator } = {
    ...defaultOptions,
    ...options
  };
  const Context = createContext(rootPath);
  const usePath = () => { return useContext(Context); };
  const withPath = function <P extends WithPathProps>(WrappedComponent: ComponentType<P>) {
    const ComponentWithPath: React.FC<Omit<P, "usePath">> = (props) => {
      return <Context.Consumer>
        {
          path => {
            return <Context.Provider value={path + separator + props.id}>
              <WrappedComponent {...({ ...props, usePath } as P)} />
            </Context.Provider>;
          }
        }
      </Context.Consumer>;
    };
    ComponentWithPath.displayName = `ComponentWithPath(${getDisplayName(WrappedComponent)})`;
    return ComponentWithPath;
  };
  return {
    withPath,
  };
};
export interface WithPathProps {
  id: string;
  usePath: () => string
}

const getDisplayName = function <P>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
