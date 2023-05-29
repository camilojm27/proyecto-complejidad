% Declaración de conjuntos y parámetros
int: n;                      % Número de equipos
set of int: TEAMS = 1..n;    % Conjunto de equipos
int: X;                      % Tamaño mínimo de giras y permanencias
int: Y;                      % Tamaño máximo de giras y permanencias

% Declaración de constantes
array[TEAMS, TEAMS] of int: D;    % Matriz de distancias

% Declaración de variables
array[1..2*(n-1), TEAMS] of var -n..n: Cal;   % Calendario
var int: gira;
var int: permanencia;

% Restricciones

% Restricción 1: n debe ser par
constraint n mod 2 = 0;

% Restricción 1: El calendario no puede tener partidos no programados
constraint
 forall (i in 1..2*(n-1), j in TEAMS) (
   Cal[i,j] != 0
 );

% Restricción 2: Alternancia de localidad
constraint
 forall (i in 1..2*(n-1), j in TEAMS, k in TEAMS) (
   Cal[i, j] = k -> Cal[i, k] = -j
 );

% Restricción 3: No hay partidos repetidos por fechas
constraint
 forall (i in 1..2*(n-1), j in TEAMS) (
   Cal[i, j] != Cal[i, j+1]
 );

% Restricción 5: No hay repeticiones consecutivas de partidos
constraint
 forall (i in 1..2*(n-2), j in TEAMS, k in TEAMS) (
   Cal[i, j] != k /\ Cal[i+1, j] != k
 );

% Restricción 6: Tamaño de giras y permanencias
constraint
 forall (j in TEAMS) (
   let {
     constraint gira = sum(i in 1..2*(n-1)) (
       if(Cal[i, j] > 0 /\ Cal[i+1, j] > 0) then 1
       else 0 endif
     ),
     constraint permanencia = sum(i in 1..2*(n-1)) (
       if(Cal[i, j] < 0 /\ Cal[i+1, j] < 0) then 1
       else 0 endif
     )
   } in
   gira >= X /\ gira <= Y /\ permanencia >= X /\ permanencia <= Y
 );

% Función objetivo: Minimizar la suma total de los costos de las giras
var int: total_cost = sum(i in TEAMS, j in TEAMS where i != j) (
 sum(k in 1..2*(n-1)) (
   if(Cal[k, i] > 0 /\ Cal[k+1, i] < 0 /\ abs(Cal[k, i]) = j) then D[i, j]
   else 0 endif
 )
);

%var int: total_cost = sum(i in 1..2*(n-1), j in 1..n where Cal[i, j] > 0) (D[j, Cal[i, j]]);

% Solución
solve minimize total_cost;
% Salida
output [show(Cal)];
