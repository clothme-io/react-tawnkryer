/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default function DocsPlugin(): JSX.Element {
  return (
    <a target="__blank" href="https://lexical.dev/docs/intro">
      <button
        id="docs-button"
        className="editor-dev-button"
        title="Lexical Docs"
      />
    </a>
  );
}
