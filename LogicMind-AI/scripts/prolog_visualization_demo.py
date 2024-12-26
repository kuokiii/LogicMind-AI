import networkx as nx
import matplotlib.pyplot as plt

def visualize_prolog_program(facts, rules):
    G = nx.DiGraph()
    
    # Add facts as nodes
    for fact in facts:
        G.add_node(fact, color='lightblue', style='filled')
    
    # Add rules as nodes and edges
    for rule_head, rule_body in rules:
        G.add_node(rule_head, color='lightgreen', style='filled')
        for body_term in rule_body:
            G.add_edge(body_term, rule_head)
    
    # Set up the plot
    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(G)
    
    # Draw nodes
    nx.draw_networkx_nodes(G, pos, node_color=[G.nodes[n].get('color', 'white') for n in G.nodes])
    nx.draw_networkx_labels(G, pos)
    
    # Draw edges
    nx.draw_networkx_edges(G, pos, edge_color='gray', arrows=True)
    
    plt.title("Prolog Program Visualization")
    plt.axis('off')
    plt.tight_layout()
    plt.show()

# Demo
prolog_code = """
% Family relationships
parent(john, mary).
parent(mary, ann).
parent(tom, jim).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \= Y.
"""

facts, rules = parse_prolog(prolog_code)
visualize_prolog_program(facts, rules)

