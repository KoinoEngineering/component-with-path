import { render, screen } from "@testing-library/react";
import React from "react";
import { createRoot, WithPathProps } from "src/index";

const Root1 = createRoot("root1");
const Root2 = createRoot("root2");

const EchoPath: React.FC<WithPathProps> = ({ id, usePath, children }) => {
    return <div id={id}>
        <div>{"My Path is : " + usePath()}</div>
        <div>
            {children}
        </div>
    </div>;
};

const EchoPathAndId: React.FC<WithPathProps> = ({ id, usePath, children }) => {
    return <div id={id}>
        <div>{"My Path is : " + usePath() + " / My id is : " + id}</div>
        <div>
            {children}
        </div>
    </div>;
};

const EchoPathWithRoot1 = Root1.withPath(EchoPath);
const EchoPathAndIdWithRoot1 = Root1.withPath(EchoPathAndId);
const EchoPathWithRoot2 = Root2.withPath(EchoPath);
const EchoPathAndIdWithRoot2 = Root2.withPath(EchoPathAndId);

describe("snap shot testings", () => {
    test("renders one root,one component", () => {
        const target = render(<div>
            <EchoPathWithRoot1 id="GrandParent">
                <EchoPathWithRoot1 id="Parent">
                    <EchoPathWithRoot1 id="Me">
                        <EchoPathWithRoot1 id="Child">
                            <EchoPathWithRoot1 id="GrandChild" />
                        </EchoPathWithRoot1>
                    </EchoPathWithRoot1>
                </EchoPathWithRoot1>
            </EchoPathWithRoot1>
        </div>);
        expect(target).toMatchSnapshot();
    });
    test("renders one root,two component", () => {
        const target = render(<div>
            <EchoPathWithRoot1 id="GrandParent">
                <EchoPathAndIdWithRoot1 id="Parent">
                    <EchoPathWithRoot1 id="Me">
                        <EchoPathAndIdWithRoot1 id="Child">
                            <EchoPathWithRoot1 id="GrandChild" />
                        </EchoPathAndIdWithRoot1>
                    </EchoPathWithRoot1>
                </EchoPathAndIdWithRoot1>
            </EchoPathWithRoot1>
        </div>);
        expect(target).toMatchSnapshot();
    });
    test("renders two root", () => {
        const target = render(<div>
            <EchoPathWithRoot1 id="GrandParent">
                <EchoPathAndIdWithRoot1 id="Parent">
                    <EchoPathWithRoot1 id="Me">
                        <EchoPathAndIdWithRoot1 id="Child">
                            <EchoPathWithRoot1 id="GrandChild" />
                        </EchoPathAndIdWithRoot1>
                    </EchoPathWithRoot1>
                </EchoPathAndIdWithRoot1>
            </EchoPathWithRoot1>
            <EchoPathWithRoot2 id="GrandParent">
                <EchoPathAndIdWithRoot2 id="Parent">
                    <EchoPathWithRoot2 id="Me">
                        <EchoPathAndIdWithRoot2 id="Child">
                            <EchoPathWithRoot2 id="GrandChild" />
                        </EchoPathAndIdWithRoot2>
                    </EchoPathWithRoot2>
                </EchoPathAndIdWithRoot2>
            </EchoPathWithRoot2>
        </div>);
    });
    test("renders mixed", () => {
        const target = render(<div>
            <EchoPathWithRoot1 id="GrandParent">
                <EchoPathAndIdWithRoot1 id="Parent">
                    <EchoPathWithRoot2 id="GrandParent">
                        <EchoPathWithRoot1 id="Me">
                            <EchoPathAndIdWithRoot2 id="Parent">
                                <EchoPathWithRoot2 id="Me">
                                    <EchoPathAndIdWithRoot1 id="Child">
                                        <EchoPathWithRoot1 id="GrandChild" />
                                        <EchoPathAndIdWithRoot2 id="Child">
                                            <EchoPathWithRoot2 id="GrandChild" />
                                        </EchoPathAndIdWithRoot2>
                                    </EchoPathAndIdWithRoot1>
                                </EchoPathWithRoot2>
                            </EchoPathAndIdWithRoot2>
                        </EchoPathWithRoot1>
                    </EchoPathWithRoot2>
                </EchoPathAndIdWithRoot1>
            </EchoPathWithRoot1>
        </div>);
        expect(target).toMatchSnapshot();
    });
})
