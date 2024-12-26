"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GradientHeading } from "@/components/ui/gradient-heading"
import { PrologVisualizer } from "@/components/prolog-visualizer"
import { simulatePrologQuery } from "@/utils/prolog-simulator"

const examples = {
  family: {
    code: `% Family relationships
parent(john, mary).
parent(john, tom).
parent(mary, ann).
parent(tom, jim).
parent(ann, lisa).
parent(jim, bob).

male(john).
male(tom).
male(jim).
male(bob).
female(mary).
female(ann).
female(lisa).

grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \\= Y.
aunt(X, Y) :- female(X), sibling(X, Z), parent(Z, Y).
uncle(X, Y) :- male(X), sibling(X, Z), parent(Z, Y).
cousin(X, Y) :- parent(P1, X), parent(P2, Y), sibling(P1, P2).

% Example queries:
% ?- parent(john, X).        % Find John's children
% ?- grandparent(john, X).   % Find John's grandchildren
% ?- sibling(mary, X).       % Find Mary's siblings
% ?- aunt(X, lisa).          % Find Lisa's aunts
% ?- cousin(X, Y).           % Find all cousin relationships`,
    description: "An extended family tree example demonstrating various relationships including parents, grandparents, siblings, aunts, uncles, and cousins.",
    sampleQueries: [
      "?- parent(john, X).",
      "?- grandparent(john, X).",
      "?- sibling(mary, X).",
      "?- aunt(X, lisa).",
      "?- cousin(X, Y)."
    ]
  },

  knowledge_base: {
    code: `% Knowledge base about programming languages
language(prolog, logic).
language(python, imperative).
language(haskell, functional).
language(scala, functional).
language(javascript, imperative).
language(erlang, functional).

feature(prolog, unification).
feature(prolog, backtracking).
feature(python, dynamic_typing).
feature(haskell, static_typing).
feature(scala, static_typing).
feature(javascript, dynamic_typing).
feature(erlang, concurrency).

good_for(prolog, ai).
good_for(prolog, expert_systems).
good_for(python, data_science).
good_for(python, web_development).
good_for(haskell, formal_verification).
good_for(scala, big_data).
good_for(javascript, web_development).
good_for(erlang, distributed_systems).

similar_languages(X, Y) :- 
    language(X, Type), 
    language(Y, Type), 
    X \\= Y.

recommend_language(Task, Lang) :- 
    good_for(Lang, Task).

has_common_feature(Lang1, Lang2) :-
    feature(Lang1, Feature),
    feature(Lang2, Feature),
    Lang1 \\= Lang2.

% Example queries:
% ?- language(X, functional).     % Find all functional languages
% ?- good_for(X, web_development). % Languages good for web development
% ?- feature(prolog, X).          % Features of Prolog
% ?- similar_languages(X, Y).      % Find similar languages
% ?- has_common_feature(python, javascript). % Check common features`,
    description: "A knowledge base about programming languages, their paradigms, features, and use cases.",
    sampleQueries: [
      "?- language(X, functional).",
      "?- good_for(X, web_development).",
      "?- feature(prolog, X).",
      "?- similar_languages(X, Y).",
      "?- has_common_feature(python, javascript)."
    ]
  },

  puzzle_solver: {
    code: `% Logic puzzle solver
% Einstein's puzzle (simplified version)
% Who owns the fish?

% Facts about houses
house(1). house(2). house(3).

% Nationality, color, pet combinations
nationality(brit).
nationality(swede).
nationality(dane).

color(red).
color(green).
color(white).

pet(dog).
pet(bird).
pet(fish).

% Solution structure
solution(Houses) :-
    Houses = [house(1,N1,C1,P1), house(2,N2,C2,P2), house(3,N3,C3,P3)],
    
    % Each house has unique nationality
    nationality(N1), nationality(N2), nationality(N3),
    all_different([N1,N2,N3]),
    
    % Each house has unique color
    color(C1), color(C2), color(C3),
    all_different([C1,C2,C3]),
    
    % Each house has unique pet
    pet(P1), pet(P2), pet(P3),
    all_different([P1,P2,P3]),
    
    % The Brit lives in the red house
    member(house(_,brit,red,_), Houses),
    
    % The Swede keeps dogs
    member(house(_,swede,_,dog), Houses),
    
    % The Dane lives in the first house
    N1 = dane,
    
    % The green house is on the left of the white house
    left_of(house(_,_,green,_), house(_,_,white,_), Houses).

% Helper predicates
all_different([]).
all_different([H|T]) :- 
    not(member(H,T)), 
    all_different(T).

left_of(L,R,[L,R|_]).
left_of(L,R,[_|T]) :- left_of(L,R,T).

member(X,[X|_]).
member(X,[_|T]) :- member(X,T).

% Example queries:
% ?- solution(Houses).         % Solve the entire puzzle
% ?- solution(H), member(house(_,_,_,fish), H). % Who owns the fish?`,
    description: "A logic puzzle solver demonstrating Prolog's power in solving constraint satisfaction problems.",
    sampleQueries: [
      "?- solution(Houses).",
      "?- solution(H), member(house(_,Owner,_,fish), H).",
      "?- solution(H), member(house(_,_,green,Pet), H).",
      "?- solution(H), member(house(Num,brit,_,_), H)."
    ]
  },

  expert_system: {
    code: `% Medical diagnosis expert system
symptom(fever).
symptom(cough).
symptom(headache).
symptom(sore_throat).
symptom(fatigue).
symptom(body_ache).
symptom(runny_nose).

disease(cold).
disease(flu).
disease(covid).
disease(allergies).

indicates(fever, flu).
indicates(fever, covid).
indicates(cough, cold).
indicates(cough, flu).
indicates(cough, covid).
indicates(headache, cold).
indicates(headache, flu).
indicates(headache, covid).
indicates(sore_throat, cold).
indicates(sore_throat, flu).
indicates(fatigue, flu).
indicates(fatigue, covid).
indicates(body_ache, flu).
indicates(body_ache, covid).
indicates(runny_nose, cold).
indicates(runny_nose, allergies).

% Rules for diagnosis
possible_disease(Disease) :-
    disease(Disease),
    has_required_symptoms(Disease).

has_required_symptoms(cold) :-
    has_symptom(cough),
    has_symptom(sore_throat).

has_required_symptoms(flu) :-
    has_symptom(fever),
    has_symptom(body_ache),
    has_symptom(fatigue).

has_required_symptoms(covid) :-
    has_symptom(fever),
    has_symptom(cough),
    has_symptom(fatigue).

has_required_symptoms(allergies) :-
    has_symptom(runny_nose),
    not(has_symptom(fever)).

% Example queries:
% ?- symptom(X).              % List all symptoms
% ?- indicates(fever, X).     % What diseases indicate fever?
% ?- possible_disease(X).     % What diseases are possible?`,
    description: "A medical diagnosis expert system that can identify possible diseases based on symptoms.",
    sampleQueries: [
      "?- symptom(X).",
      "?- indicates(fever, X).",
      "?- possible_disease(X).",
      "?- indicates(X, flu)."
    ]
  },

  graph_algorithms: {
    code: `% Graph algorithms in Prolog
% Graph representation
edge(a, b, 4).
edge(a, c, 2).
edge(b, c, 1).
edge(b, d, 5).
edge(c, d, 8).
edge(c, e, 10).
edge(d, e, 2).
edge(d, f, 6).
edge(e, f, 3).

% Path finding
path(A, B, Path, Length) :-
    path(A, B, [A], Q, Length),
    reverse(Q, Path).

path(A, B, Visited, [B|Visited], Length) :-
    edge(A, B, Length).
path(A, B, Visited, Path, Length) :-
    edge(A, C, D1),
    C \\= B,
    \\+ member(C, Visited),
    path(C, B, [C|Visited], Path, D2),
    Length is D1 + D2.

% Shortest path
shortest_path(A, B, Path, Length) :-
    setof([P,L], path(A,B,P,L), Paths),
    Paths = [[Path,Length]|_].

% Connected nodes
connected(A, B) :- edge(A, B, _).
connected(A, B) :- edge(A, X, _), connected(X, B).

% Cycle detection
cycle(Node) :-
    edge(Node, Next, _),
    path(Next, Node, Path, _),
    write('Cycle found: '), write([Node|Path]), nl.

% Example queries:
% ?- path(a, f, Path, Length).        % Find a path from a to f
% ?- shortest_path(a, f, Path, Length). % Find shortest path
% ?- connected(a, f).                 % Check if nodes are connected
% ?- cycle(a).                        % Find cycles starting from a`,
    description: "Implementation of various graph algorithms including path finding, shortest path, connectivity checking, and cycle detection.",
    sampleQueries: [
      "?- path(a, f, Path, Length).",
      "?- shortest_path(a, f, Path, Length).",
      "?- connected(a, f).",
      "?- cycle(a)."
    ]
  },
  nlp_system: {
    code: `% Natural Language Processing example
% Sentence structure rules
sentence(S) :- noun_phrase(NP), verb_phrase(VP), append(NP, VP, S).

noun_phrase([Det,Noun]) :- determiner(Det), noun(Noun).
verb_phrase([Verb,Obj]) :- verb(Verb), noun(Obj).

% Dictionary
determiner(the).
determiner(a).
determiner(an).

noun(cat).
noun(dog).
noun(bird).
noun(fish).

verb(chases).
verb(catches).
verb(watches).
verb(likes).

% Sentence generator
generate_sentence(S) :- sentence(S).

% Sentence validator
valid_sentence(S) :- sentence(S).

% Example queries:
% ?- generate_sentence(S).           % Generate a valid sentence
% ?- valid_sentence([the,cat,chases,bird]). % Check if sentence is valid
% ?- noun_phrase(NP).               % Generate noun phrases
% ?- verb_phrase(VP).               % Generate verb phrases`,
    description: "A simple natural language processing system that can generate and validate basic English sentences.",
    sampleQueries: [
      "?- generate_sentence(S).",
      "?- valid_sentence([the,cat,chases,bird]).",
      "?- noun_phrase(NP).",
      "?- verb_phrase(VP)."
    ]
  },

  game_playing: {
    code: `% Tic-tac-toe game implementation
% Board representation: list of 9 elements (1-9 positions)
initial_board([1,2,3,4,5,6,7,8,9]).

% Display board
display_board([A,B,C,D,E,F,G,H,I]) :-
    write([A,B,C]), nl,
    write([D,E,F]), nl,
    write([G,H,I]), nl.

% Valid moves
valid_move([Pos|_], Pos) :- integer(Pos).
valid_move([_|Rest], Pos) :- valid_move(Rest, Pos).

% Make move
make_move(Board, Pos, Player, NewBoard) :-
    valid_move(Board, Pos),
    replace(Board, Pos, Player, NewBoard).

% Replace element in list
replace([_|T], 1, X, [X|T]).
replace([H|T], P, X, [H|R]) :-
    P > 1,
    P1 is P - 1,
    replace(T, P1, X, R).

% Win conditions
win_position(Board, Player) :-
    % Rows
    (Board = [Player,Player,Player|_]);
    (Board = [_,_,_,Player,Player,Player|_]);
    (Board = [_,_,_,_,_,_,Player,Player,Player]);
    % Columns
    (Board = [Player,_,_,Player,_,_,Player,_,_]);
    (Board = [_,Player,_,_,Player,_,_,Player,_]);
    (Board = [_,_,Player,_,_,Player,_,_,Player]);
    % Diagonals
    (Board = [Player,_,_,_,Player,_,_,_,Player]);
    (Board = [_,_,Player,_,Player,_,Player,_,_]).

% Game over conditions
game_over(Board, Winner) :-
    win_position(Board, Winner).
game_over(Board, 'Draw') :-
    \\+ win_position(Board, x),
    \\+ win_position(Board, o),
    \\+ valid_move(Board, _).

% Example queries:
% ?- initial_board(B), display_board(B).    % Show initial board
% ?- make_move([1,2,3,4,5,6,7,8,9], 5, x, NewBoard). % Make a move
% ?- win_position([x,x,x,4,5,6,7,8,9], x).  % Check win condition
% ?- game_over([x,x,x,o,o,6,7,8,9], Winner). % Check if game is over`,
    description: "A Tic-tac-toe game implementation demonstrating game state representation and logic.",
    sampleQueries: [
      "?- initial_board(B), display_board(B).",
      "?- make_move([1,2,3,4,5,6,7,8,9], 5, x, NewBoard).",
      "?- win_position([x,x,x,4,5,6,7,8,9], x).",
      "?- game_over([x,x,x,o,o,6,7,8,9], Winner)."
    ]
  },

  planning_system: {
    code: `% Planning system for daily tasks
% Task definitions
task(wake_up, 0).
task(breakfast, 30).
task(exercise, 60).
task(shower, 20).
task(work, 480).
task(lunch, 60).
task(dinner, 60).
task(sleep, 480).

% Dependencies
requires(breakfast, wake_up).
requires(exercise, wake_up).
requires(shower, exercise).
requires(work, shower).
requires(lunch, work).
requires(dinner, lunch).
requires(sleep, dinner).

% Time constraints
start_time(wake_up, 600).  % 6:00 AM
end_time(sleep, 2200).     % 10:00 PM

% Schedule validation
valid_schedule(Schedule) :-
    check_dependencies(Schedule),
    check_time_constraints(Schedule).

% Check task dependencies
check_dependencies([]).
check_dependencies([Task|Rest]) :-
    findall(Req, requires(Task, Req), Reqs),
    all_members(Reqs, Rest),
    check_dependencies(Rest).

% Check if all elements are members of list
all_members([], _).
all_members([H|T], List) :-
    member(H, List),
    all_members(T, List).

% Generate valid schedule
generate_schedule(Schedule) :-
    findall(Task, task(Task, _), Tasks),
    permutation(Tasks, Schedule),
    valid_schedule(Schedule).

% Example queries:
% ?- generate_schedule(S).           % Generate a valid schedule
% ?- valid_schedule([wake_up,breakfast,exercise,shower,work,lunch,dinner,sleep]).
% ?- requires(X, wake_up).          % What requires waking up?
% ?- task(X, Duration).             % List all tasks and durations`,
    description: "A planning system that generates and validates daily schedules based on task dependencies and time constraints.",
    sampleQueries: [
      "?- generate_schedule(S).",
      "?- valid_schedule([wake_up,breakfast,exercise,shower,work,lunch,dinner,sleep]).",
      "?- requires(X, wake_up).",
      "?- task(X, Duration)."
    ]
  }
}

export default function PrologPlayground() {
  const [code, setCode] = useState(examples.family.code)
  const [query, setQuery] = useState(examples.family.sampleQueries[0])
  const [output, setOutput] = useState("")
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>("family")

  const runCode = () => {
    const result = simulatePrologQuery(code, query)
    setOutput(result)
  }

  const handleExampleChange = (value: string) => {
    const example = examples[value as keyof typeof examples]
    setSelectedExample(value as keyof typeof examples)
    setCode(example.code)
    setQuery(example.sampleQueries[0])
    setOutput("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <GradientHeading>
        Prolog Playground
      </GradientHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Prolog Code</span>
              <Select onValueChange={handleExampleChange} value={selectedExample}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choose an example" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family Relations</SelectItem>
                  <SelectItem value="knowledge_base">Programming Languages KB</SelectItem>
                  <SelectItem value="puzzle_solver">Logic Puzzle Solver</SelectItem>
                  <SelectItem value="expert_system">Medical Expert System</SelectItem>
                  <SelectItem value="graph_algorithms">Graph Algorithms</SelectItem>
                  <SelectItem value="nlp_system">NLP System</SelectItem>
                  <SelectItem value="game_playing">Tic-Tac-Toe</SelectItem>
                  <SelectItem value="planning_system">Daily Planner</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              {examples[selectedExample].description}
            </p>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono h-[400px] mb-4"
            />
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Sample Queries:</h3>
                <div className="flex flex-wrap gap-2">
                  {examples[selectedExample].sampleQueries.map((sampleQuery, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(sampleQuery)}
                    >
                      {sampleQuery}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your Prolog query (e.g., ?- parent(john, X).)"
                />
                <Button onClick={runCode} className="w-full">Run Query</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md h-[200px] overflow-auto">
              {output}
            </pre>
            <PrologVisualizer code={code} query={query} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

