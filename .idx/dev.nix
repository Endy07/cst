{ pkgs, ... }: {
  # Melyik szoftvercsatornát használja
  channel = "stable-23.11"; 

  # Szükséges csomagok (Python a szerverhez)
  packages = [
    pkgs.python3
  ];

  # IDX specifikus beállítások
  idx = {
    extensions = [
      
    ];

    # Itt állítjuk be az előnézetet
    previews = {
      enable = true;
      previews = {
        web = {
          # Ez a parancs indul el, amikor megnyitod a projektet
          # A $PORT változót az IDX tölti ki automatikusan
          command = ["python3" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}