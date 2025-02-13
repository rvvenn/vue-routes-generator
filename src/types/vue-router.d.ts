declare type Awaitable<T> = T | Promise<T>;

/**
 * Maybe a promise maybe not
 * @internal
 */
export declare type _Awaitable<T> = T | PromiseLike<T>;

declare type PathParams = Record<string, string | string[]>;

declare interface PathParser {
    /**
     * The regexp used to match a url
     */
    re: RegExp;
    /**
     * The score of the parser
     */
    score: Array<number[]>;
    /**
     * Keys that appeared in the path
     */
    keys: PathParserParamKey[];
    /**
     * Parses a url and returns the matched params or null if it doesn't match. An
     * optional param that isn't preset will be an empty string. A repeatable
     * param will be an array if there is at least one value.
     *
     * @param path - url to parse
     * @returns a Params object, empty if there are no params. `null` if there is
     * no match
     */
    parse(path: string): PathParams | null;
    /**
     * Creates a string version of the url
     *
     * @param params - object of params
     * @returns a url
     */
    stringify(params: PathParams): string;
}

/**
 * A param in a url like `/users/:id`
 */
declare interface PathParserParamKey {
    name: string;
    repeatable: boolean;
    optional: boolean;
}

/**
 * Allowed Component definitions in route records provided by the user
 */
declare type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

/**
 * Allowed Component in {@link RouteLocationMatched}
 */
export declare type RouteComponent = Component | DefineComponent;

/**
 * Type safe versions of types that are exposed by vue-router. We have to use a generic check to allow for names to be `undefined` when no `RouteMap` is provided.
 */
/**
 * {@link RouteLocationRaw} resolved using the matcher
 */
export declare type RouteLocation<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationGeneric : RouteLocationTypedList<RouteMap>[Name];

/**
 * Route location as an object with a `path` property.
 */
export declare type RouteLocationAsPath<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationAsPathGeneric : RouteLocationAsPathTypedList<RouteMap>[Name];

/**
 * Generic version of {@link RouteLocationAsPath}. It is used when no {@link RouteMap} is provided.
 */
export declare interface RouteLocationAsPathGeneric extends RouteQueryAndHash, RouteLocationOptions {
    /**
     * Percentage encoded pathname section of the URL.
     */
    path: string;
}

/**
 * Helper to generate a type safe version of the {@link RouteLocationAsPath} type.
 */
export declare interface RouteLocationAsPathTyped<RouteMap extends RouteMapGeneric = RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> extends RouteLocationAsPathGeneric {
    path: _LiteralUnion<RouteMap[Name]['path']>;
}

/**
 * List of all possible {@link RouteLocationAsPath} indexed by the route name.
 * @internal
 */
export declare type RouteLocationAsPathTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationAsPathTyped<RouteMap, N>;
};

/**
 * Route location relative to the current location. It accepts other properties than `path` like `params`, `query` and
 * `hash` to conveniently change them.
 */
export declare type RouteLocationAsRelative<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationAsRelativeGeneric : RouteLocationAsRelativeTypedList<RouteMap>[Name];

/**
 * Generic version of {@link RouteLocationAsRelative}. It is used when no {@link RouteMap} is provided.
 */
export declare interface RouteLocationAsRelativeGeneric extends RouteQueryAndHash, RouteLocationOptions {
    name?: RouteRecordNameGeneric;
    params?: RouteParamsRawGeneric;
    /**
     * A relative path to the current location. This property should be removed
     */
    path?: undefined;
}

/**
 * Helper to generate a type safe version of the {@link RouteLocationAsRelative} type.
 */
export declare interface RouteLocationAsRelativeTyped<RouteMap extends RouteMapGeneric = RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> extends RouteLocationAsRelativeGeneric {
    name?: Extract<Name, string | symbol>;
    params?: RouteMap[Name]['paramsRaw'];
}

/**
 * List of all possible {@link RouteLocationAsRelative} indexed by the route name.
 * @internal
 */
export declare type RouteLocationAsRelativeTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationAsRelativeTyped<RouteMap, N>;
};

/**
 * Same as {@link RouteLocationAsPath} but as a string literal.
 */
export declare type RouteLocationAsString<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? string : _LiteralUnion<RouteLocationAsStringTypedList<RouteMap>[Name], string>;

/**
 * Helper to generate a type safe version of the {@link RouteLocationAsString} type.
 */
export declare type RouteLocationAsStringTyped<RouteMap extends RouteMapGeneric = RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> = RouteMap[Name]['path'];

/**
 * List of all possible {@link RouteLocationAsString} indexed by the route name.
 * @internal
 */
export declare type RouteLocationAsStringTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationAsStringTyped<RouteMap, N>;
};

/**
 * Base properties for a normalized route location.
 *
 * @internal
 */
export declare interface _RouteLocationBase extends Pick<MatcherLocation, 'name' | 'path' | 'params' | 'meta'> {
    /**
     * The whole location including the `search` and `hash`. This string is
     * percentage encoded.
     */
    fullPath: string;
    /**
     * Object representation of the `search` property of the current location.
     */
    query: LocationQuery;
    /**
     * Hash of the current location. If present, starts with a `#`.
     */
    hash: string;
    /**
     * Contains the location we were initially trying to access before ending up
     * on the current location.
     */
    redirectedFrom: RouteLocation | undefined;
}

/**
 * Generic version of {@link RouteLocation}. It is used when no {@link RouteMap} is provided.
 */
export declare interface RouteLocationGeneric extends _RouteLocationBase {
    /**
     * Array of {@link RouteRecord} containing components as they were
     * passed when adding records. It can also contain redirect records. This
     * can't be used directly. **This property is non-enumerable**.
     */
    matched: RouteRecord[];
}

/**
 * Allows overriding the current route returned by `useRoute` in tests. rl
 * stands for route location
 *
 * @internal
 */
export declare const routeLocationKey: InjectionKey<RouteLocationNormalizedLoaded>;

export declare interface RouteLocationMatched extends RouteRecordNormalized {
    components: Record<string, RouteComponent> | null | undefined;
}

/**
 * Route Location that can infer the necessary params based on the name.
 *
 * @internal
 */
export declare interface RouteLocationNamedRaw extends RouteQueryAndHash, LocationAsRelativeRaw, RouteLocationOptions {
}

/**
 * Similar to {@link RouteLocation} but its
 * {@link RouteLocationNormalizedTyped.matched | `matched` property} cannot contain redirect records
 */
export declare type RouteLocationNormalized<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationNormalizedGeneric : RouteLocationNormalizedTypedList<RouteMap>[Name];

/**
 * Generic version of {@link RouteLocationNormalized} that is used when no {@link RouteMap} is provided.
 */
export declare interface RouteLocationNormalizedGeneric extends _RouteLocationBase {
    name: RouteRecordNameGeneric;
    params: RouteParamsGeneric;
    /**
     * Array of {@link RouteRecordNormalized}
     */
    matched: RouteRecordNormalized[];
}

/**
 * Similar to {@link RouteLocationNormalized} but its `components` do not contain any function to lazy load components.
 * In other words, it's ready to be rendered by `<RouterView>`.
 */
export declare type RouteLocationNormalizedLoaded<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationNormalizedLoadedGeneric : RouteLocationNormalizedLoadedTypedList<RouteMap>[Name];

/**
 * Generic version of {@link RouteLocationNormalizedLoaded} that is used when no {@link RouteMap} is provided.
 */
export declare interface RouteLocationNormalizedLoadedGeneric extends RouteLocationNormalizedGeneric {
    /**
     * Array of {@link RouteLocationMatched} containing only plain components (any
     * lazy-loaded components have been loaded and were replaced inside the
     * `components` object) so it can be directly used to display routes. It
     * cannot contain redirect records either. **This property is non-enumerable**.
     */
    matched: RouteLocationMatched[];
}

/**
 * Helper to generate a type safe version of the {@link RouteLocationNormalizedLoaded} type.
 */
export declare interface RouteLocationNormalizedLoadedTyped<RouteMap extends RouteMapGeneric = RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> extends RouteLocationNormalizedLoadedGeneric {
    name: Extract<Name, string | symbol>;
    params: RouteMap[Name]['params'];
}

/**
 * List of all possible {@link RouteLocationNormalizedLoaded} indexed by the route name.
 * @internal
 */
export declare type RouteLocationNormalizedLoadedTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationNormalizedLoadedTyped<RouteMap, N>;
};

/**
 * Helper to generate a type safe version of the {@link RouteLocationNormalized} type.
 */
export declare interface RouteLocationNormalizedTyped<RouteMap extends RouteMapGeneric = RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> extends RouteLocationNormalizedGeneric {
    name: Extract<Name, string | symbol>;
    params: RouteMap[Name]['params'];
    /**
     * Array of {@link RouteRecordNormalized}
     */
    matched: RouteRecordNormalized[];
}

/**
 * List of all possible {@link RouteLocationNormalized} indexed by the route name.
 * @internal
 */
export declare type RouteLocationNormalizedTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationNormalizedTyped<RouteMap, N>;
};

/**
 * Common options for all navigation methods.
 */
export declare interface RouteLocationOptions {
    /**
     * Replace the entry in the history instead of pushing a new entry
     */
    replace?: boolean;
    /**
     * Triggers the navigation even if the location is the same as the current one.
     * Note this will also add a new entry to the history unless `replace: true`
     * is passed.
     */
    force?: boolean;
    /**
     * State to save using the History API. This cannot contain any reactive
     * values and some primitives like Symbols are forbidden. More info at
     * https://developer.mozilla.org/en-US/docs/Web/API/History/state
     */
    state?: HistoryState;
}

/**
 * Route Location that can infer the possible paths.
 *
 * @internal
 */
export declare interface RouteLocationPathRaw extends RouteQueryAndHash, MatcherLocationAsPath, RouteLocationOptions {
}

/**
 * Route location that can be passed to `router.push()` and other user-facing APIs.
 */
export declare type RouteLocationRaw<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationAsString | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric : _LiteralUnion<RouteLocationAsStringTypedList<RouteMap>[Name], string> | RouteLocationAsRelativeTypedList<RouteMap>[Name] | RouteLocationAsPathTypedList<RouteMap>[Name];

/**
 * Route location resolved with {@link Router | `router.resolve()`}.
 */
export declare type RouteLocationResolved<Name extends keyof RouteMap = keyof RouteMap> = RouteMapGeneric extends RouteMap ? RouteLocationResolvedGeneric : RouteLocationResolvedTypedList<RouteMap>[Name];

/**
 * Generic version of {@link RouteLocationResolved}. It is used when no {@link RouteMap} is provided.
 */
export declare interface RouteLocationResolvedGeneric extends RouteLocationGeneric {
    /**
     * Resolved `href` for the route location that will be set on the `<a href="...">`.
     */
    href: string;
}

/**
 * Helper to generate a type safe version of the {@link RouteLocationResolved} type.
 */
export declare interface RouteLocationResolvedTyped<RouteMap extends RouteMapGeneric, Name extends keyof RouteMap> extends RouteLocationTyped<RouteMap, Name> {
    /**
     * Resolved `href` for the route location that will be set on the `<a href="...">`.
     */
    href: string;
}

/**
 * List of all possible {@link RouteLocationResolved} indexed by the route name.
 * @internal
 */
export declare type RouteLocationResolvedTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationResolvedTyped<RouteMap, N>;
};

/**
 * Helper to generate a type safe version of the {@link RouteLocation} type.
 */
export declare interface RouteLocationTyped<RouteMap extends RouteMapGeneric, Name extends keyof RouteMap> extends RouteLocationGeneric {
    name: Extract<Name, string | symbol>;
    params: RouteMap[Name]['params'];
}

/**
 * List of all possible {@link RouteLocation} indexed by the route name.
 * @internal
 */
export declare type RouteLocationTypedList<RouteMap extends RouteMapGeneric = RouteMapGeneric> = {
    [N in keyof RouteMap]: RouteLocationTyped<RouteMap, N>;
};

/**
 * Convenience type to get the typed RouteMap or a generic one if not provided. It is extracted from the {@link TypesConfig} if it exists, it becomes {@link RouteMapGeneric} otherwise.
 */
export declare type RouteMap = TypesConfig extends Record<'RouteNamedMap', infer RouteNamedMap> ? RouteNamedMap : RouteMapGeneric;

/**
 * Generic version of the `RouteMap`.
 */
export declare type RouteMapGeneric = Record<string | symbol, RouteRecordInfo>;

/**
 * Interface to type `meta` fields in route records.
 *
 * @example
 *
 * ```ts
 * // typings.d.ts or router.ts
 * import 'vue-router';
 *
 * declare module 'vue-router' {
 *   interface RouteMeta {
 *     requiresAuth?: boolean
 *   }
 * }
 * ```
 */
export declare interface RouteMeta extends Record<string | number | symbol, unknown> {
}

/**
 * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
 * @see {@link RouteParamsGeneric}
 */
export declare type RouteParams<Name extends keyof RouteMap = keyof RouteMap> = RouteMap[Name]['params'];

export declare type RouteParamsGeneric = Record<string, RouteParamValue | RouteParamValue[]>;

/**
 * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
 * @see {@link RouteParamsRaw}
 */
export declare type RouteParamsRaw<Name extends keyof RouteMap = keyof RouteMap> = RouteMap[Name]['paramsRaw'];

export declare type RouteParamsRawGeneric = Record<string, RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]>;

/**
 * @internal
 */
export declare type RouteParamValue = string;

/**
 * @internal
 */
export declare type RouteParamValueRaw = RouteParamValue | number | null | undefined;

/**
 * @internal
 */
export declare interface RouteQueryAndHash {
    query?: LocationQueryRaw;
    hash?: string;
}

/**
 * {@inheritDoc RouteRecordNormalized}
 */
export declare type RouteRecord = RouteRecordNormalized;

/**
 * Callback that can be passed to `next()` in `beforeRouteEnter()` guards.
 */
export declare type NavigationGuardNextCallback = (vm: any) => unknown;

/**
 * Return types for a Navigation Guard. Based on `TypesConfig`
 *
 * @see {@link TypesConfig}
 */
export declare type NavigationGuardReturn = void | Error | boolean | RouteLocationRaw;

/**
 * `next()` callback passed to navigation guards.
 */
export declare interface NavigationGuardNext {
  (): void;
  (error: Error): void;
  (location: RouteLocationRaw): void;
  (valid: boolean | undefined): void;
  (cb: NavigationGuardNextCallback): void;
}

/**
 * Navigation Guard with a type parameter for `this`.
 * @see {@link TypesConfig}
 */
export declare interface NavigationGuardWithThis<T> {
  (this: T, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext): _Awaitable<NavigationGuardReturn>;
}



/**
 * Helper type to define a Typed `RouteRecord`
 * @see {@link RouteRecord}
 */
export declare interface RouteRecordInfo<Name extends string | symbol = string, Path extends string = string, ParamsRaw extends RouteParamsRawGeneric = RouteParamsRawGeneric, Params extends RouteParamsGeneric = RouteParamsGeneric, Meta extends RouteMeta = RouteMeta> {
    name: Name;
    path: Path;
    paramsRaw: ParamsRaw;
    params: Params;
    meta: Meta;
}

declare interface RouteRecordMatcher extends PathParser {
    record: RouteRecord;
    parent: RouteRecordMatcher | undefined;
    children: RouteRecordMatcher[];
    alias: RouteRecordMatcher[];
}

/**
 * Possible values for a route record **after normalization**
 *
 * NOTE: since `RouteRecordName` is a type, it evaluates too early and it's often the generic version {@link RouteRecordNameGeneric}. If you need a typed version of all of the names of routes, use {@link RouteMap | `keyof RouteMap`}
 */
export declare type RouteRecordName = RouteMapGeneric extends RouteMap ? RouteRecordNameGeneric : keyof RouteMap;

/**
 * Generic version of {@link RouteRecordName}.
 */
export declare type RouteRecordNameGeneric = string | symbol | undefined;












































/**
 * @internal
 */
export declare type _RouteRecordProps<Name extends keyof RouteMap = keyof RouteMap> = boolean | Record<string, any> | ((to: RouteLocationNormalized<Name>) => Record<string, any>);

export declare type RouteRecordRaw = RouteRecordSingleView | RouteRecordSingleViewWithChildren | RouteRecordMultipleViews | RouteRecordMultipleViewsWithChildren | RouteRecordRedirect;

export declare type PathParserOptions = Pick<_PathParserOptions, 'end' | 'sensitive' | 'strict'>;

/**
 * @internal
 */
export declare interface _PathParserOptions {
    /**
     * Makes the RegExp case-sensitive.
     *
     * @defaultValue `false`
     */
    sensitive?: boolean;
    /**
     * Whether to disallow a trailing slash or not.
     *
     * @defaultValue `false`
     */
    strict?: boolean;
    /**
     * Should the RegExp match from the beginning by prepending a `^` to it.
     * @internal
     *
     * @defaultValue `true`
     */
    start?: boolean;
    /**
     * Should the RegExp match until the end by appending a `$` to it.
     *
     * @defaultValue `true`
     */
    end?: boolean;
}

/**
 * Internal type for common properties among all kind of {@link RouteRecordRaw}.
 */
export declare interface _RouteRecordBase extends PathParserOptions {
  /**
   * Path of the record. Should start with `/` unless the record is the child of
   * another record.
   *
   * @example `/users/:id` matches `/users/1` as well as `/users/posva`.
   */
  path: string;
  /**
   * Where to redirect if the route is directly matched. The redirection happens
   * before any navigation guard and triggers a new navigation with the new
   * target location.
   */
  redirect?: RouteRecordRedirectOption;
  /**
   * Aliases for the record. Allows defining extra paths that will behave like a
   * copy of the record. Allows having paths shorthands like `/users/:id` and
   * `/u/:id`. All `alias` and `path` values must share the same params.
   */
  alias?: string | string[];
  /**
   * Name for the route record. Must be unique.
   */
  name?: RouteRecordNameGeneric;
  /**
   * Before Enter guard specific to this record. Note `beforeEnter` has no
   * effect if the record has a `redirect` property.
   */
  beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
  /**
   * Arbitrary data attached to the record.
   */
  meta?: RouteMeta;
  /**
   * Array of nested routes.
   */
  children?: RouteRecordRaw[];
  /**
   * Allow passing down params as props to the component rendered by `router-view`.
   */
  props?: _RouteRecordProps | Record<string, _RouteRecordProps>;
}

/**
 * @internal
 */
export declare type RouteRecordRedirectOption = RouteLocationRaw | ((to: RouteLocation) => RouteLocationRaw);

/**
 * Route Record defining one single component with the `component` option.
 */
export declare interface RouteRecordSingleView extends _RouteRecordBase {
    /**
     * Component to display when the URL matches this route.
     */
    component: RawRouteComponent;
    components?: never;
    children?: never;
    redirect?: never;
    /**
     * Allow passing down params as props to the component rendered by `router-view`.
     */
    props?: _RouteRecordProps;
}

/**
 * Route Record defining one single component with a nested view.
 */
export declare interface RouteRecordSingleViewWithChildren extends _RouteRecordBase {
    /**
     * Component to display when the URL matches this route.
     */
    component?: RawRouteComponent | null | undefined;
    components?: never;
    children: RouteRecordRaw[];
    /**
     * Allow passing down params as props to the component rendered by `router-view`.
     */
    props?: _RouteRecordProps;
}

/**
 * Route Record defining multiple named components with the `components` option.
 */
export declare interface RouteRecordMultipleViews extends _RouteRecordBase {
  /**
   * Components to display when the URL matches this route. Allow using named views.
   */
  components: Record<string, RawRouteComponent>;
  component?: never;
  children?: never;
  redirect?: never;
  /**
   * Allow passing down params as props to the component rendered by
   * `router-view`. Should be an object with the same keys as `components` or a
   * boolean to be applied to every component.
   */
  props?: Record<string, _RouteRecordProps> | boolean;
}

/**
 * Route Record defining multiple named components with the `components` option and children.
 */
export declare interface RouteRecordMultipleViewsWithChildren extends _RouteRecordBase {
  /**
   * Components to display when the URL matches this route. Allow using named views.
   */
  components?: Record<string, RawRouteComponent> | null | undefined;
  component?: never;
  children: RouteRecordRaw[];
  /**
   * Allow passing down params as props to the component rendered by
   * `router-view`. Should be an object with the same keys as `components` or a
   * boolean to be applied to every component.
   */
  props?: Record<string, _RouteRecordProps> | boolean;
}

/**
 * Route Record that defines a redirect. Cannot have `component` or `components`
 * as it is never rendered.
 */
export declare interface RouteRecordRedirect extends _RouteRecordBase {
  redirect: RouteRecordRedirectOption;
  component?: never;
  components?: never;
  props?: never;
}