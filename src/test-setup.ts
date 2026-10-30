// Vitest setup: inject the host runtime the plugin normally receives from
// register(api), and unmount rendered trees between tests.
import React from 'react';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { initRuntime } from './runtime';

initRuntime({
  React,
  registerExtension: () => {},
  fetch: () => Promise.reject(new Error('fetch is not stubbed in this test')),
  basePath: '/v1/clusters/test/plugins/plugin-hub',
  cssNonce: '',
  hostVersion: 'test',
  uiContractVersion: 'test',
});

afterEach(cleanup);
