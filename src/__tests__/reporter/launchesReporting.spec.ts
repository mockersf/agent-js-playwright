/*
 *  Copyright 2021 EPAM Systems
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import MyReporter from '../../reporter';
import { config } from '../mocks/configMock';
import { StartLaunchObjType } from '../../models';
import { RPClientMock } from '../mocks/RPClientMock';

describe('start report launch', () => {
  const reporter = new MyReporter(config);
  reporter.client = new RPClientMock(config);
  const startLaunchObj: StartLaunchObjType = {
    name: config.launch,
    startTime: reporter.client.helpers.now(),
    attributes: config.attributes,
    description: config.description,
  };
  reporter.onBegin();

  test('client.startLaunch should be called with corresponding params', () => {
    expect(reporter.client.startLaunch).toHaveBeenCalledTimes(1);
    expect(reporter.client.startLaunch).toHaveBeenCalledWith(startLaunchObj);
  });

  test('reporter.launchId should be set', () => {
    expect(reporter.launchId).toEqual('tempLaunchId');
  });
});

describe('finish report launch', () => {
  const reporter = new MyReporter(config);
  reporter.client = new RPClientMock(config);
  reporter.launchId = 'tempLaunchId';
  reporter.onEnd();

  test('launch should be finished', () => {
    expect(reporter.client.finishLaunch).toHaveBeenCalledTimes(1);
    expect(reporter.client.finishLaunch).toHaveBeenCalledWith('tempLaunchId', { endTime: reporter.client.helpers.now() });
  });
});
