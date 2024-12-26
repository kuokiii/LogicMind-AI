class InferenceEngine:
    def __init__(self, knowledge_base):
        self.kb = knowledge_base

    def forward_chain(self, goal):
        new_facts = set()
        while True:
            added = False
            for rule in self.kb.rules:
                if all(antecedent in self.kb.facts for antecedent in rule.antecedents):
                    if rule.consequent not in self.kb.facts:
                        self.kb.add_fact(rule.consequent)
                        new_facts.add(rule.consequent)
                        added = True
            if not added or goal in new_facts:
                break
        return goal in new_facts

    def backward_chain(self, goal):
        if goal in self.kb.facts:
            return True
        for rule in self.kb.rules:
            if rule.consequent == goal:
                if all(self.backward_chain(antecedent) for antecedent in rule.antecedents):
                    return True
        return False

# Demo
kb = KnowledgeBase()
kb.add_fact("parent(john, mary)")
kb.add_fact("parent(mary, ann)")
kb.add_rule(Rule(["parent(X, Y)", "parent(Y, Z)"], "grandparent(X, Z)"))

ie = InferenceEngine(kb)
print(ie.forward_chain("grandparent(john, ann)"))  # True
print(ie.backward_chain("grandparent(john, ann)"))  # True

