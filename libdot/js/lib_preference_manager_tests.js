// Copyright 2017 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * @fileoverview Unit tests for lib.PreferenceManager.
 */

describe('lib_preference_manager_tests.js', () => {

/**
 * If another window changes a preference to the default it will delete the
 * localStorage entry. Here we mock the deleting of a localStorage entry so we
 * can test the window correctly return the default value.
 */
it('local-delete-default', (done) => {
  const storage = new lib.Storage.Local();
  const preferenceManager = new lib.PreferenceManager(storage);
  const defaultColor = 'red';

  preferenceManager.definePreference('color', defaultColor, function(value) {
    assert.strictEqual(value, defaultColor);
    done();
  });

  // Fake current value is 'blue'.
  preferenceManager.prefRecords_['color'].currentValue = 'blue';

  /**
   * Workaround bad extern in closure. cl/307771888
   *
   * @suppress {checkTypes}
   * @return {!StorageEvent}
   */
  function newEvent() {
    return new StorageEvent('storage', {
      storageArea: window.localStorage,
      key: '/color',
      oldValue: JSON.stringify('blue'),
      newValue: null,
    });
  }
  // Simpulate deleting the key on another browser.
  const event = newEvent();
  window.dispatchEvent(event);
});

});
