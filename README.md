# component-with-path
コンポーネントに対してidを連結したパスを自動的に埋め込むことができる

## インストール
```
   npm i --save component-with-path
```

## 使用方法
### 基本の使用方法
    import React from "react";
    import ReactDOM from "react-dom";
    import { createRoot } from "component-with-path";

    // 任意の名前で初期化する
    const Root = createRoot("root");

    // サンプル用コンポーネント
    // 受け取ったidとpathを書き出すだけ
    const SampleComponent = ({ id, usePath, children }) => {
        const path = usePath();
        return <div>
            <div>
                {"My path is : " + path + " / My id is : " + id }
            </div>
                {
                    children && <div>
                    {
                        children
                    }
                    </div>
                }
            </div>;
        };

    // Rootを使用してラップする
    const SampleComponentWithPath = Root.withPath(SampleComponent);

    // ネストしてレンダリングする
    ReactDOM.render(
        <React.StrictMode>
            <SampleComponentWithPath id="hoge">               // -> root.hoge
                <SampleComponentWithPath id="fuga">           // -> root.hoge.fuga
                    <SampleComponentWithPath id="foo">        // -> root.hoge.fuga.foo
                        <SampleComponentWithPath id="bar" />  // -> root.hoge.fuga.foo.bar
                    </SampleComponentWithPath>
                </SampleComponentWithPath>
            </SampleComponentWithPath>
        </React.StrictMode>,
        document.getElementById("root")
    );

### 複数のルート / 複数のコンポーネント
    // 複数のルートを使用可能
    const Root1 = createRoot("root1");
    const Root2 = createRoot("root2");

    // Root毎、コンポーネントごとにラップする
    const SampleComponent1WithRoot1 = Root1.withPath(SampleComponent1);
    const SampleComponent2WithRoot1 = Root1.withPath(SampleComponent2);

    const SampleComponent1WithRoot2 = Root2.withPath(SampleComponent1);
    const SampleComponent2WithRoot2 = Root1.withPath(SampleComponent2);

    // ルート毎のパスを得ることができる
    ReactDOM.render(
        <React.StrictMode>
            <SampleComponent1WithRoot1 id="hoge">               // -> root1.hoge
                <SampleComponent1WithRoot2 id="fuga">           // -> root2.fuga
                    <SampleComponent2WithRoot1 id="foo">        // -> root1.hoge.foo
                        <SampleComponent2WithRoot2 id="bar" />  // -> root2.fuga.bar
                    </SampleComponent2WithRoot1>
                </SampleComponent1WithRoot2>
            </SampleComponent1WithRoot1>
        </React.StrictMode>,
        document.getElementById("root")
    );
### 各種オプション
  - 使い方
    ```
    // createRootの第2引数にオプションオブジェクトを渡すことが可能
    const Root = createRoot("root", {separator : "_"})
    ```
  - プロパティ
    |プロパティ名|型|デフォルト|
    |-|-|-|
    |separator|string|"."|