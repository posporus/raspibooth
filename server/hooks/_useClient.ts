import { useState } from 'preact/hooks'

export const useClient = () => useState<boolean>(typeof Deno === 'undefined')