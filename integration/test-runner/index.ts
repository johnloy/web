import { BrowserLauncher, TestRunnerCoreConfig } from '@web/test-runner-core';
import { runBasicTest } from './tests/basic/runBasicTest';
import { runConfigGroupsTest } from './tests/config-groups/runConfigGroupsTest';
import { runParallelTest } from './tests/parallel/runParallelTest';
import { runTestFailureTest } from './tests/test-failure/runTestFailureTest';
import { runLocationChangeTest } from './tests/location-change/runLocationChangeTest';
import { runFocusTest } from './tests/focus/runFocusTest';
import { runManyTests } from './tests/many/runManyTests';

const timeout = (ms: number) => new Promise(r => setTimeout(r, ms));

export interface Tests {
  basic: boolean;
  many: boolean;
  focus: boolean;
  groups: boolean;
  parallel: boolean;
  testFailure: boolean;
  locationChanged: boolean;
}

export async function runIntegrationTests(
  createConfig: () => Partial<TestRunnerCoreConfig> & { browsers: BrowserLauncher[] },
  tests: Tests,
  config: { delayBetweenTests?: number } = {},
) {
  if (tests.basic !== false) {
    runBasicTest(createConfig());
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }

  if (tests.many !== false) {
    runManyTests(createConfig());
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }

  if (tests.focus !== false) {
    runFocusTest(createConfig());
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }

  if (tests.groups !== false) {
    runConfigGroupsTest(createConfig());
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }

  if (tests.parallel !== false) {
    runParallelTest(createConfig);
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }

  if (tests.testFailure !== false) {
    runTestFailureTest(createConfig());
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }

  if (tests.locationChanged !== false) {
    runLocationChangeTest(createConfig());
    if (config.delayBetweenTests) {
      await timeout(config.delayBetweenTests);
    }
  }
}
