import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedScript {
  id: string;
  name: string;
  code: string;
  timestamp: string;
}

export interface StarterSnippet {
  id: string;
  title: string;
  phase: string;
  code: string;
  description: string;
}

interface PyodideState {
  // Pyodide instance
  pyodide: any | null;
  isLoading: boolean;
  isReady: boolean;
  isRunning: boolean;
  error: string | null;
  
  // Editor state
  currentCode: string;
  output: string[];
  
  // Saved scripts
  savedScripts: SavedScript[];
  draftCode: string;
  lastSaved: string | null;
  
  // Actions
  setPyodide: (pyodide: any) => void;
  setLoading: (loading: boolean) => void;
  setReady: (ready: boolean) => void;
  setRunning: (running: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentCode: (code: string) => void;
  addOutput: (output: string) => void;
  clearOutput: () => void;
  saveScript: (name: string) => void;
  loadScript: (id: string) => void;
  deleteScript: (id: string) => void;
  saveDraft: () => void;
  loadDraft: () => void;
  clearEditor: () => void;
  resetEnvironment: () => void;
}

// Starter snippets library
export const starterSnippets: StarterSnippet[] = [
  {
    id: 'variables-fstrings',
    title: 'Variables & f-strings',
    phase: 'Phase 1',
    description: 'Basic variable assignment and formatted printing',
    code: `# Variables and f-strings practice
name = "Alice"
age = 28
role = "AI Engineer"

# f-string formatting
greeting = f"Hello, {name}!"
info = f"{name} is {age} years old and works as a {role}."

print(greeting)
print(info)

# Expressions in f-strings
tokens = 1500
cost_per_1k = 0.003
total_cost = (tokens / 1000) * cost_per_1k
print(f"Cost for {tokens} tokens: $\{total_cost:.4f}")
`
  },
  {
    id: 'list-slicing',
    title: 'List slicing practice',
    phase: 'Phase 1',
    description: 'SAP T-codes with slicing exercises',
    code: `# List slicing with SAP T-codes
tcodes = ["SU01", "PFCG", "SM30", "SE16", "SE38", "SE80", "STMS", "SCC4", "SE11", "SE93"]

# Get first 3 T-codes
print("First 3:", tcodes[:3])  # Expected: ['SU01', 'PFCG', 'SM30']

# Get last 3 T-codes
print("Last 3:", tcodes[-3:])  # Expected: ['SE11', 'SE93']

# Get every 2nd T-code
print("Every 2nd:", tcodes[::2])  # Expected: ['SU01', 'SM30', 'SE38', 'STMS', 'SE11']

# Reverse the list
print("Reversed:", tcodes[::-1])

# Get middle section (index 3 to 7)
print("Middle:", tcodes[3:7])  # Expected: ['SE16', 'SE38', 'SE80', 'STMS']
`
  },
  {
    id: 'dictionary-operations',
    title: 'Dictionary operations',
    phase: 'Phase 1',
    description: 'SAP user dict with access patterns',
    code: `# Dictionary operations with SAP user data
sap_user = {
    "username": "JSMITH",
    "name": "John Smith",
    "email": "john.smith@company.com",
    "roles": ["SAP_ALL", "SAP_NEW"],
    "last_login": "2024-06-14",
    "locked": False
}

# Accessing values
print(f"Username: {sap_user['username']}")
print(f"Name: {sap_user['name']}")

# Safe access with .get()
print(f"Department: {sap_user.get('department', 'Not specified')}")

# Checking if key exists
if "roles" in sap_user:
    print(f"User has {len(sap_user['roles'])} roles")

# Iterating over dictionary
print("\\nAll user details:")
for key, value in sap_user.items():
    print(f"  {key}: {value}")

# Adding new key
sap_user["department"] = "IT Security"
print(f"\\nUpdated user: {sap_user}")
`
  },
  {
    id: 'chunking-function',
    title: 'Text chunking function',
    phase: 'Phase 5',
    description: 'Chunk text with overlap for RAG',
    code: `# Text chunking function for RAG
def chunk_text(text, chunk_size=100, overlap=20):
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap
    
    return chunks

# Sample SAP security policy text
sap_policy = """SAP security policies require all users to have unique usernames. 
Password complexity must include uppercase, lowercase, numbers, and special characters. 
Passwords must be changed every 90 days. Failed login attempts are limited to 3 before account lockout. 
Segregation of Duties (SoD) conflicts must be reviewed quarterly. 
All critical transactions require dual authorization."""

# Chunk the text
chunks = chunk_text(sap_policy, chunk_size=80, overlap=15)

print(f"Original text length: {len(sap_policy)} characters")
print(f"Number of chunks: {len(chunks)}\\n")

for i, chunk in enumerate(chunks, 1):
    print(f"Chunk {i} ({len(chunk)} chars):")
    print(f"  {chunk.strip()}")
    print()
`
  },
  {
    id: 'cosine-similarity',
    title: 'Cosine similarity (manual)',
    phase: 'Phase 5',
    description: 'Calculate similarity between vectors',
    code: `import numpy as np

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors."""
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    return dot_product / (norm1 * norm2)

# Example: Embedding vectors (simplified)
query_embedding = np.array([0.2, 0.5, 0.8, 0.1])
doc1_embedding = np.array([0.3, 0.6, 0.7, 0.2])
doc2_embedding = np.array([0.1, 0.2, 0.1, 0.9])

# Calculate similarities
sim1 = cosine_similarity(query_embedding, doc1_embedding)
sim2 = cosine_similarity(query_embedding, doc2_embedding)

print(f"Query vector: {query_embedding}")
print(f"\\nDocument 1 similarity: {sim1:.4f}")
print(f"Document 2 similarity: {sim2:.4f}")

if sim1 > sim2:
    print("\\nDocument 1 is more similar to the query")
else:
    print("\\nDocument 2 is more similar to the query")
`
  },
  {
    id: 'list-comprehensions',
    title: 'List comprehensions',
    phase: 'Phase 1',
    description: 'Before/after comparison exercises',
    code: `# List comprehensions - before and after

# Example 1: Square numbers
# Before (traditional loop)
squares_loop = []
for i in range(10):
    squares_loop.append(i ** 2)
print("Squares (loop):", squares_loop)

# After (list comprehension)
squares_comp = [i ** 2 for i in range(10)]
print("Squares (comprehension):", squares_comp)

# Example 2: Filter even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Before
evens_loop = []
for num in numbers:
    if num % 2 == 0:
        evens_loop.append(num)
print("\\nEvens (loop):", evens_loop)

# After
evens_comp = [num for num in numbers if num % 2 == 0]
print("Evens (comprehension):", evens_comp)

# Example 3: Transform SAP T-codes to lowercase
tcodes = ["SU01", "PFCG", "SM30", "SE16"]

# Before
lower_loop = []
for tcode in tcodes:
    lower_loop.append(tcode.lower())
print("\\nLowercase (loop):", lower_loop)

# After
lower_comp = [tcode.lower() for tcode in tcodes]
print("Lowercase (comprehension):", lower_comp)
`
  },
  {
    id: 'class-basics',
    title: 'Class basics (OOP)',
    phase: 'Phase 1',
    description: 'SAPUser class skeleton',
    code: `# Object-Oriented Programming basics

class SAPUser:
    """Represents an SAP user."""
    
    def __init__(self, username, name, email):
        self.username = username
        self.name = name
        self.email = email
        self.roles = []
        self.locked = False
    
    def add_role(self, role):
        """Add a role to the user."""
        if role not in self.roles:
            self.roles.append(role)
            print(f"Added role {role} to {self.username}")
    
    def lock_account(self):
        """Lock the user account."""
        self.locked = True
        print(f"Account {self.username} is now locked")
    
    def unlock_account(self):
        """Unlock the user account."""
        self.locked = False
        print(f"Account {self.username} is now unlocked")
    
    def display_info(self):
        """Display user information."""
        status = "Locked" if self.locked else "Active"
        print(f"\\nUser: {self.username}")
        print(f"Name: {self.name}")
        print(f"Email: {self.email}")
        print(f"Roles: {', '.join(self.roles) if self.roles else 'None'}")
        print(f"Status: {status}")

# Create user instances
user1 = SAPUser("JSMITH", "John Smith", "john@company.com")
user1.add_role("SAP_ALL")
user1.add_role("SAP_NEW")
user1.display_info()

user2 = SAPUser("MJONES", "Mary Jones", "mary@company.com")
user2.add_role("SAP_AUDITOR")
user2.lock_account()
user2.display_info()
`
  },
  {
    id: 'numpy-arrays',
    title: 'NumPy arrays',
    phase: 'Phase 9',
    description: 'Basic array operations, dot product, norms',
    code: `import numpy as np

# Creating arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([5, 4, 3, 2, 1])

print("Array 1:", arr1)
print("Array 2:", arr2)

# Element-wise operations
print("\\nElement-wise addition:", arr1 + arr2)
print("Element-wise multiplication:", arr1 * arr2)

# Dot product
dot_product = np.dot(arr1, arr2)
print(f"\\nDot product: {dot_product}")

# Norms (vector length)
norm1 = np.linalg.norm(arr1)
norm2 = np.linalg.norm(arr2)
print(f"\\nNorm of arr1: {norm1:.4f}")
print(f"Norm of arr2: {norm2:.4f}")

# 2D arrays (matrices)
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("\\nMatrix:")
print(matrix)
print(f"Shape: {matrix.shape}")
print(f"Mean: {matrix.mean():.2f}")
print(f"Sum: {matrix.sum()}")

# Slicing 2D arrays
print("\\nFirst row:", matrix[0])
print("First column:", matrix[:, 0])
print("Center element:", matrix[1, 1])
`
  },
  {
    id: 'neural-network-forward',
    title: 'Neural network forward pass',
    phase: 'Phase 11',
    description: 'Simple 2-layer network with numpy',
    code: `import numpy as np

def sigmoid(x):
    """Sigmoid activation function."""
    return 1 / (1 + np.exp(-x))

def forward_pass(X, W1, b1, W2, b2):
    """
    Forward pass through a 2-layer neural network.
    X: input (n_samples, n_features)
    W1: weights layer 1 (n_features, n_hidden)
    b1: bias layer 1 (n_hidden,)
    W2: weights layer 2 (n_hidden, n_output)
    b2: bias layer 2 (n_output,)
    """
    # Layer 1
    z1 = np.dot(X, W1) + b1
    a1 = sigmoid(z1)
    
    # Layer 2
    z2 = np.dot(a1, W2) + b2
    a2 = sigmoid(z2)
    
    return a1, a2

# Example: Binary classification
np.random.seed(42)

# Input: 3 samples, 4 features each
X = np.array([[0.5, 0.3, 0.8, 0.1],
              [0.2, 0.7, 0.4, 0.9],
              [0.9, 0.1, 0.6, 0.3]])

# Network architecture: 4 -> 3 -> 1
W1 = np.random.randn(4, 3) * 0.1  # 4 inputs, 3 hidden neurons
b1 = np.zeros(3)
W2 = np.random.randn(3, 1) * 0.1  # 3 hidden, 1 output
b2 = np.zeros(1)

# Forward pass
hidden, output = forward_pass(X, W1, b1, W2, b2)

print("Input shape:", X.shape)
print("Hidden layer output shape:", hidden.shape)
print("Final output shape:", output.shape)
print("\\nPredictions:")
for i, pred in enumerate(output):
    print(f"  Sample {i+1}: {pred[0]:.4f}")
`
  }
];

export const usePyodideStore = create<PyodideState>()(
  persist(
    (set, get) => ({
      pyodide: null,
      isLoading: false,
      isReady: false,
      isRunning: false,
      error: null,
      currentCode: '',
      output: [],
      savedScripts: [],
      draftCode: '',
      lastSaved: null,
      
      setPyodide: (pyodide) => set({ pyodide }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setReady: (ready) => set({ isReady: ready }),
      
      setRunning: (running) => set({ isRunning: running }),
      
      setError: (error) => set({ error }),
      
      setCurrentCode: (code) => set({ currentCode: code }),
      
      addOutput: (output) => set((state) => ({
        output: [...state.output, output]
      })),
      
      clearOutput: () => set({ output: [] }),
      
      saveScript: (name) => {
        const { currentCode, savedScripts } = get();
        const newScript: SavedScript = {
          id: Date.now().toString(),
          name,
          code: currentCode,
          timestamp: new Date().toISOString()
        };
        set({
          savedScripts: [...savedScripts, newScript],
          lastSaved: new Date().toISOString()
        });
      },
      
      loadScript: (id) => {
        const { savedScripts } = get();
        const script = savedScripts.find(s => s.id === id);
        if (script) {
          set({ currentCode: script.code });
        }
      },
      
      deleteScript: (id) => {
        const { savedScripts } = get();
        set({
          savedScripts: savedScripts.filter(s => s.id !== id)
        });
      },
      
      saveDraft: () => {
        const { currentCode } = get();
        set({ draftCode: currentCode });
      },
      
      loadDraft: () => {
        const { draftCode } = get();
        if (draftCode) {
          set({ currentCode: draftCode });
        }
      },
      
      clearEditor: () => set({ currentCode: '' }),
      
      resetEnvironment: async () => {
        set({
          pyodide: null,
          isReady: false,
          isLoading: false,
          error: null,
          output: []
        });
      }
    }),
    {
      name: 'pyodide-storage',
      partialize: (state) => ({
        savedScripts: state.savedScripts,
        draftCode: state.draftCode,
        lastSaved: state.lastSaved
      })
    }
  )
);

// Made with Bob
