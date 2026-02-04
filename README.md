# Obsidian MDX

Preview [MDX](https://github.com/mdx-js/mdx/) in Obsidian, with support for [Code Hike](https://github.com/code-hike/codehike), [Nextra](https://nextra.site/)

## Features

- **MDX Preview**: Render MDX files directly in Obsidian with live preview
- **Code Hike Integration**: Full support for interactive code walkthroughs
- **Nextra Components**: Includes popular components like Callouts, Tabs, Cards, Steps, FileTree, and Tables
- **Internationalization**: All code comments and documentation translated to English for broader accessibility

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

This plugin now supports all Nextra built-in components from the [official documentation](https://nextra.cndocs.org/docs/built-ins).

#### Callout

Supports all Nextra callout types: `default`, `info`, `warning`, `error`, `success`, and `important`.

```mdx
<Callout type="info">
  This is an informational callout.
</Callout>

<Callout type="warning">
  Be careful with this step!
</Callout>

<Callout type="error">
  Something went wrong.
</Callout>

<Callout type="important">
  Key information users need to know.
</Callout>

<Callout type="info" emoji="⭐">
  Custom emoji callout!
</Callout>
```

#### Tabs

Supports Nextra's advanced features including `defaultIndex`, `storageKey`, and custom styling.

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

<!-- With defaultIndex -->
<Tabs items={['npm', 'pnpm', 'yarn']} defaultIndex={1}>
  ...
</Tabs>

<!-- With localStorage persistence -->
<Tabs items={['npm', 'pnpm', 'yarn']} storageKey="package-manager">
  ...
</Tabs>
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
import { Steps } from 'nextra/components'

## Getting Started Here is some description.

<Steps>
### Step 1
	Contents for step 1. 

### Step 2
	Contents for step 2.
</Steps>
```

#### Bleed

A component to expand content beyond the container's width.

```mdx
<!-- Slight overflow -->
<Bleed>
  ![Wide Image](./image.png)
</Bleed>

<!-- Full-width, edge-to-edge -->
<Bleed full>
  ![Full Width Image](./banner.png)
</Bleed>
```

#### Table

Nextra-style table component with enhanced styling.

```mdx
<Table>
  <thead>
    <Table.Tr>
      <Table.Th>Feature</Table.Th>
      <Table.Th>Supported</Table.Th>
    </Table.Tr>
  </thead>
  <tbody>
    <Table.Tr>
      <Table.Td>MDX Support</Table.Td>
      <Table.Td>✅</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Theming</Table.Td>
      <Table.Td>✅</Table.Td>
    </Table.Tr>
  </tbody>
</Table>
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
