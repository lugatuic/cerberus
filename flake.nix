{
  description = "Cerberus Dev Environment 23.05";

  inputs = {
    nixpkgs.url = "nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, ... }@inputs:
    inputs.flake-utils.lib.eachSystem inputs.flake-utils.lib.defaultSystems
      (system:
        let pkgs = import inputs.nixpkgs {inherit system;};
        in {
          devShell = pkgs.mkShell {
            name = "Cerberus Dev Env for ${system}";
            packages = with pkgs; [openldap nodejs nodePackages.typescript-language-server];
          };
        });
}

# I spent way too much time on this. Simple Explanation:
# This flake is pinned to nixpkgs release 22.11
# flake-utils gives a helper function to make
# devShell.<system> for every Nix supported system
#
# TODO: Pin flake-utils
