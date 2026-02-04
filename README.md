# Obsidian MDX

Preview [MDX](https://github.com/mdx-js/mdx/) in Obsidian, with support for [Code Hike](https://github.com/code-hike/codehike), [Nextra](https://nextra.site/), and [Astro](https://astro.build/) components.

## Installation

https://obsidian.md/plugins?search=yulei%20chen

## Getting Started

### Usage

1. Write MDX syntax in Obsidian (and it is recommended to have open source mode turned on).
2. Press `ctrl/cmd + p` to open the Command Palette.
3. Type `mdx: preview` in the Command Palette and press `Enter`.

![code-hike-example](https://github.com/yuleicul/obsidian-mdx/assets/27288153/a28bea0c-610a-4282-ad89-89fccc504f8a)

## Supported Components

### Code Hike

This plugin provides full support for Code Hike. If you want to try it out, you can copy [this example](https://github.com/code-hike/codehike/blob/next/examples/vite/src/hello.mdx) to Obsidian.

### Nextra-style Components

#### Tabs

```mdx
<Tabs items={['npm', 'yarn', 'pnpm']} defaultValue="npm">
  <Tab value="npm">
    ```bash
    npm install my-package
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn add my-package
    ```
  </Tab>
  <Tab value="pnpm">
    ```bash
    pnpm add my-package
    ```
  </Tab>
</Tabs>
```

#### Callout

```mdx
<Callout type="info" title="Information">
  This is an informational callout.
</Callout>

<Callout type="warning" title="Warning">
  Be careful with this step!
</Callout>

<Callout type="error" title="Error">
  Something went wrong.
</Callout>

<Callout type="success" title="Success">
  Operation completed successfully!
</Callout>
```

#### Cards

```mdx
<Cards>
  <Card title="Getting Started" href="/getting-started">
    Learn how to install and configure the project.
  </Card>
  <Card title="Components" href="/components">
    Explore the available components.
  </Card>
</Cards>
```

#### Steps

```mdx
<Steps>
  <Step title="Install the package">
    Run `npm install` to install dependencies.
  </Step>
  <Step title="Configure the plugin">
    Add the plugin to your configuration file.
  </Step>
  <Step title="Start using it">
    You're ready to go!
  </Step>
</Steps>
```

#### FileTree

```mdx
<FileTree>
  <Folder name="src" defaultOpen>
    <Folder name="components">
      <File name="Button.tsx" />
      <File name="Card.tsx" />
    </Folder>
    <File name="index.ts" />
    <File name="app.tsx" />
  </Folder>
  <File name="package.json" />
  <File name="README.md" />
</FileTree>
```

### Astro-style Components

#### Aside

```mdx
<Aside type="note" title="Note">
  This is a note aside.
</Aside>

<Aside type="tip">
  Here's a helpful tip!
</Aside>

<Aside type="caution">
  Be cautious about this.
</Aside>

<Aside type="danger">
  This is a dangerous operation.
</Aside>
```

> **Note:** `Aside` is an alias for `Callout` with Astro-style API (`type="note|tip|caution|danger"`).

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
