import { Icon, IconProps } from "./icon.deps.ts"

export function ActivateIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="activate" />;
}
