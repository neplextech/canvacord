import _docs from "../data/docs.json";
import type { Documentation } from "micro-docgen";
import Fuse from "fuse.js";

export const docs = _docs as unknown as Documentation;

for (const prop in docs.modules) {
  docs.modules[prop as keyof typeof docs.modules].classes.forEach(
    // @ts-expect-error
    (c) => (c.data.__type = "class")
  );
  docs.modules[prop as keyof typeof docs.modules].functions.forEach(
    // @ts-expect-error
    (c) => (c.data.__type = "function")
  );
  docs.modules[prop as keyof typeof docs.modules].types.forEach(
    // @ts-expect-error
    (c) => (c.data.__type = "type")
  );
  docs.modules[prop as keyof typeof docs.modules].variables.forEach(
    // @ts-expect-error
    (c) => (c.data.__type = "variable")
  );
  docs.modules[prop as keyof typeof docs.modules].enum.forEach(
    // @ts-expect-error
    (c) => (c.data.__type = "enum")
  );
}

type Doc = {
  name: string;
  type: "class" | "function" | "type" | "property" | "variable" | "enum";
  href: string;
  module: string;
  displayName: string;
};

const EXTERNAL_LINKS = {
  string:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  String:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
  number:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  Number:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
  boolean:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  Boolean:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
  symbol:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  Symbol:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
  void: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  undefined:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
  Object:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  object:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
  Function:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  function:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
  Array:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
  Set: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
  Map: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
  Date: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
  RegExp:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
  Promise:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  Error:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
  Generator:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator",
  EventEmitter:
    "https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter",
  Timeout:
    "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout",
  Buffer:
    "https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer",
  ReadableStream:
    "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
  Readable:
    "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
  Duplex:
    "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_duplex",
  ChildProcess:
    "https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_class_childprocess",
  Worker:
    "https://nodejs.org/api/worker_threads.html#worker_threads_class_worker",
  MessagePort:
    "https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport",
  IncomingMessage:
    "https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_incomingmessage",
  RequestInfo:
    "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch",
  RequestInit:
    "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch",
  RequestOptions:
    "https://nodejs.org/dist/latest/docs/api/http.html#http_http_request_options_callback",
  Response: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
};

export const docsLink = (() => {
  type DocLink = {
    module: string;
    type: "class" | "function" | "type" | "variable" | "enum";
    href: string;
    target: string;
  };

  const entries: DocLink[] = [];

  const mods = Object.values(docs.modules);

  for (const mod of mods) {
    mod.classes.forEach((c) =>
      entries.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/class/${c.data.name}`,
        target: c.data.name,
        type: "class",
      })
    );
    mod.functions.forEach((c) =>
      entries.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/function/${c.data.name}`,
        target: c.data.name,
        type: "function",
      })
    );
    mod.types.forEach((c) =>
      entries.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/type/${c.data.name}`,
        target: c.data.name,
        type: "type",
      })
    );
    mod.variables.forEach((c) =>
      entries.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/variable/${c.data.name}`,
        target: c.data.name,
        type: "variable",
      })
    );
    mod.enum.forEach((c) =>
      entries.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/enum/${c.data.name}`,
        target: c.data.name,
        type: "enum",
      })
    );
  }

  return { internal: entries, external: EXTERNAL_LINKS };
})();
export const libNames = Object.values(docs.modules).map((m) => m.name);

const seed: Doc[] = (() => {
  const props: Doc[] = [];

  for (const mod of Object.values(docs.modules)) {
    mod.classes.forEach((cls) => {
      props.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/class/${cls.data.name}`,
        name: cls.data.name,
        type: "class",
        displayName: cls.data.name,
      });

      cls.data.methods.forEach((method) => {
        props.push({
          href: `/docs/${encodeURIComponent(mod.name)}/class/${
            cls.data.name
          }?scrollTo=fm-${method.name}`,
          module: mod.name,
          name: method.name,
          type: "function",
          displayName: `${cls.data.name}.${method.name}()`,
        });
      });

      cls.data.properties.forEach((prop) => {
        props.push({
          href: `/docs/${encodeURIComponent(mod.name)}/class/${
            cls.data.name
          }?scrollTo=p-${prop.name}`,
          module: mod.name,
          name: prop.name,
          type: "property",
          displayName: `${cls.data.name}.${prop.name}`,
        });
      });
    });

    mod.types.forEach((cls) =>
      props.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/type/${cls.data.name}`,
        name: cls.data.name,
        type: "type",
        displayName: cls.data.name,
      })
    );

    mod.functions.forEach((cls) =>
      props.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/function/${cls.data.name}`,
        name: cls.data.name,
        type: "function",
        displayName: cls.data.name,
      })
    );

    mod.enum.forEach((cls) =>
      props.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/enum/${cls.data.name}`,
        name: cls.data.name,
        type: "enum",
        displayName: cls.data.name,
      })
    );

    mod.variables.forEach((cls) =>
      props.push({
        module: mod.name,
        href: `/docs/${encodeURIComponent(mod.name)}/variable/${cls.data.name}`,
        name: cls.data.name,
        type: "variable",
        displayName: cls.data.name,
      })
    );
  }

  return props;
})();

const fuse = new Fuse(seed, {
  keys: ["name"],
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 80,
  minMatchCharLength: 1,
});

export function searchDocs(query: string) {
  return fuse.search(query, { limit: 50 }).map((r) => r.item);
}
