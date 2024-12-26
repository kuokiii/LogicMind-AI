def unify(term1, term2, substitution=None):
    if substitution is None:
        substitution = {}
    
    if term1 == term2:
        return substitution
    elif isinstance(term1, str) and term1.islower():
        return unify_var(term1, term2, substitution)
    elif isinstance(term2, str) and term2.islower():
        return unify_var(term2, term1, substitution)
    elif isinstance(term1, list) and isinstance(term2, list):
        if len(term1) != len(term2):
            return None
        for t1, t2 in zip(term1, term2):
            substitution = unify(t1, t2, substitution)
            if substitution is None:
                return None
        return substitution
    else:
        return None

def unify_var(var, term, substitution):
    if var in substitution:
        return unify(substitution[var], term, substitution)
    elif term in substitution:
        return unify(var, substitution[term], substitution)
    else:
        substitution[var] = term
        return substitution

# Demo
print(unify("X", "john"))  # {'X': 'john'}
print(unify(["father", "X", "Y"], ["father", "john", "mary"]))  # {'X': 'john', 'Y': 'mary'}
print(unify(["father", "X", "X"], ["father", "john", "mary"]))  # None

