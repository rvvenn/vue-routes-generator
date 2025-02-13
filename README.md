# Vue Routes Generator

Simple folder based router generator for Vue Router

## Overview

- Vue Router
- Vue i18n
- Node >= 20

## Usage

Install

```sh
npm install vue-routes-generator
```

in your vue router config when define routes import and add the routes generator

```js
import { createRoutes } from "vue-routes-generator"

const router = createRouter({
  history: createWebHistory(),
  routes: createRoutes(), // add create routes here
})
```

## Test

