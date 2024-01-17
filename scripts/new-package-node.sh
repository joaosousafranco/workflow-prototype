#!/bin/bash

set -euo pipefail

package_name=$1

script_dir=$(dirname "$(pwd)/$0")

# shellcheck disable=SC2164
pushd "$script_dir" > /dev/null

cd ..

package_folder="packages/${package_name}"

cp -a "$script_dir/template-node" "${package_folder}"

sed -i "s/template-node/${package_name}/g" "${package_folder}/package.json"

# shellcheck disable=SC2164
popd > /dev/null
