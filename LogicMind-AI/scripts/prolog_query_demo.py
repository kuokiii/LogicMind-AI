class PrologInterpreter:
    def __init__(self, facts, rules):
        self.facts = facts
        self.rules = rules

    def query(self, goal):
        return self._solve(goal, {})

    def _solve(self, goal, substitution):
        predicate, args = self._parse_term(goal)
        
        # Check facts
        for fact in self.facts:
            fact_predicate, fact_args = self._parse_term(fact)
            if predicate == fact_predicate and len(args) == len(fact_args):
                new_substitution = self._unify(args, fact_args, substitution.copy())
                if new_substitution is not None:
                    yield new_substitution

        # Check rules
        for rule_head, rule_body in self.rules:
            rule_predicate, rule_args = self._parse_term(rule_head)
            if predicate == rule_predicate and len(args) == len(rule_args):
                new_substitution = self._unify(args, rule_args, substitution.copy())
                if new_substitution is not None:
                    yield from self._solve_body(rule_body, new_substitution)

    def _solve_body(self, body, substitution):
        if not body:
            yield substitution
        else:
            for solution in self._solve(body[0], substitution):
                yield from self._solve_body(body[1:], solution)

    def _parse_term(self, term):
        match = re.match(r'(\w+)$$(.*)$$', term)
        if match:
            predicate = match.group(1)
            args = [arg.strip() for arg in match.group(2).split(',')]
            return predicate, args
        return term, []

    def _unify(self, args1, args2, substitution):
        if len(args1) != len(args2):
            return None
        for a1, a2 in zip(args1, args2):
            if a1.islower():  # Variable
                if a1 in substitution:
                    if substitution[a1] != a2:
                        return None
                else:
                    substitution[a1] = a2
            elif a2.islower():  # Variable
                if a2 in substitution:
                    if substitution[a2] != a1:
                        return None
                else:
                    substitution[a2] = a1
            elif a1 != a2:
                return None
        return substitution

# Demo
facts, rules = parse_prolog(prolog_code)
interpreter = PrologInterpreter(facts, rules)

print("Query: grandparent(john, X)")
for solution in interpreter.query("grandparent(john, X)"):
    print(solution)

