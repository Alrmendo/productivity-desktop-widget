/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import DesktopWorkspace from './components/DesktopWorkspace';
import WindowFrame from './components/WindowFrame';

export default function App() {
  return (
    <WindowFrame title="TRUNG TÂM ĐIỀU KHIỂN" onClose={() => window.electronAPI.closeWindow()}>
      <DesktopWorkspace />
    </WindowFrame>
  );
}

