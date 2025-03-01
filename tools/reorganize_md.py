import re
import os

def extract_lesson_info(file_path):
    """Extract lesson numbers and titles from the markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract lesson information using regex
    lesson_pattern = r'Lesson (\d+) of 66 (.*?)(?=Lesson \d+ of 66|$)'
    lessons = re.findall(lesson_pattern, content, re.DOTALL)
    
    return lessons

def organize_by_modules(lessons):
    """Organize lessons by modules based on the course structure."""
    modules = {
        "Understand the Power of GenAI": {
            "Video overview: Understand the power": None,
            "Welcome": None,
            "Technical Insight 1: Batch processing": None,
            "Technical Insight 2: GUI and API": None,
            "Technical Insight 3: From a user to a builder": None,
            "Homework": None
        },
        "GenAI Internals and Best Practices": {
            "Video overview": None,
            "Research: How LLMs work internally - Memory, knowledge, and context window": None,
            "Make sense of common pitfalls - Laziness": None,
            "Make sense of common pitfalls - Forgetting": None,
            "Make sense of common pitfalls - Files and webpages": None,
            "Applicaiton: New way to use ChatGPT - Edit, not chat": None,
            "Case study: Weekly business review - Part 1": None,
            "Case study: Weekly business review - Part 2": None,
            "The power of automation, and the role of AI": None
        },
        "Class Project: Bridging GUIs and APIs": {
            "Overview": None,
            "Project 1: Extracting Data from the CVP": None,
            "Project 2: Downloading Images from an API": None,
            "Project 3: Enhancing Web Search with Pagination": None,
            "Project 4: Image Content Analysis Using AI": None,
            "Project 5: Automating GUI Interactions": None,
            "Summary and Reflection": None,
            "Video walkthrough": None,
            "Invite your friends to our community": None
        },
        "Open Source LLMs and Tool Chain": {
            "Why Are We Discussing Open-Source Models": None,
            "Ollama and Open WebUI": None,
            "Configuration and Features of Open WebUI": None,
            "Implementing a Fully Local RAG Without Internet": None,
            "Enhancing LLM Capabilities with Agents": None,
            "Revisiting Context Window Management": None,
            "Revisiting Automated Weekly Business Report": None
        },
        "Integrate GenAI to Your Daily Work: Framework and Cases": {
            "Video overview": None,
            "Introduction": None,
            "Step 1: Identify the bottleneck of your work": None,
            "Learning 1: Delegate to AI selectively": None,
            "Step 2: Explore the technical feasibility": None,
            "Learning 2: Document management for AI": None,
            "Step 3: Explore the intelligence feasibility": None,
            "Learning 3: Assessment mechanisms": None,
            "Step 4: Build": None,
            "Learning 4: Risk management": None,
            "Technical insight: Think like a manager": None
        },
        "Become Future Proof": {
            "Become future proof: Video overview": None,
            "Introduction": None,
            "Asking the right questions": None,
            "Research: GenAI is built on consensus": None,
            "Conjecture: How is GenAI different from humans": None,
            "Takeaway 1: Work with hallucination": None,
            "Actionable guildline: Which tasks shall I delegate to AI": None,
            "Takeaway 2: Valuable opinions are contrarian": None
        },
        "Bonus Module - How LLMs are Trained": {
            "Training a Machine Learning Model": None,
            "Pre-Training an LLM": None,
            "Problem of the Noisy Nudge": None,
            "Instruction Fine Tuning": None,
            "Reinforcement Learning from Human Feedback": None,
            "Temperature in LLM Inference": None,
            "Why Didn't We Touch RAG?": None
        },
        "Bonus Module - Mastering Cursor: From Comments to Agents": {
            "Introduction and Video Overview": None,
            "Getting Started with Cursor: Your AI Coding Partner": None,
            "Comment-Oriented Programming: Let the AI Fill in the Gaps": None,
            "Prompt-Oriented Programming: Chatting Your Way to Better Code": None,
            "Objective-Oriented Programming: Agents at Work": None,
            "Refining Cursor's Role: Guiding Its Behavior with Rules": None,
            "Expanding Cursor's Capabilities with External Tools": None,
            "Using Cursor as a General AI Entry Point": None,
            "Overcoming Limitations and Best Practices": None
        }
    }
    
    # Match lessons to modules
    organized_content = {}
    for lesson_num, lesson_title in lessons:
        lesson_num = int(lesson_num)
        lesson_title = lesson_title.strip()
        
        # Find which module this lesson belongs to
        for module, topics in modules.items():
            for topic in topics:
                if topic.lower() in lesson_title.lower() or lesson_title.lower() in topic.lower():
                    if topics[topic] is None:
                        topics[topic] = (lesson_num, lesson_title)
                        if module not in organized_content:
                            organized_content[module] = []
                        organized_content[module].append((lesson_num, lesson_title))
                        break
    
    return organized_content

def create_organized_markdown(organized_content, original_file, output_file):
    """Create a new markdown file with organized content."""
    with open(original_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract lesson content using regex
    lesson_pattern = r'Lesson (\d+) of 66 (.*?)(?=Lesson \d+ of 66|$)'
    lesson_contents = re.findall(lesson_pattern, content, re.DOTALL)
    
    # Create a dictionary of lesson content
    lesson_dict = {}
    for num, text in lesson_contents:
        lesson_dict[int(num)] = text.strip()
    
    # Create the new organized markdown content
    new_content = "# Superline Academy - Organized by Modules\n\n## Table of Contents\n\n"
    
    # Add table of contents
    for module in organized_content:
        new_content += f"- [{module}](#{module.lower().replace(' ', '-').replace(':', '').replace(',', '')})\n"
    
    new_content += "\n"
    
    # Add content for each module
    for module, lessons in organized_content.items():
        new_content += f"## {module}\n\n"
        
        for lesson_num, lesson_title in lessons:
            new_content += f"### Lesson {lesson_num}: {lesson_title}\n\n"
            if lesson_num in lesson_dict:
                new_content += f"{lesson_dict[lesson_num]}\n\n"
            else:
                new_content += "Content not available.\n\n"
    
    # Write to the output file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Organized markdown saved to {output_file}")

if __name__ == "__main__":
    input_file = "research/superline_academy.md"
    output_file = "research/superline_academy_organized.md"
    
    # Get the absolute paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(current_dir, input_file)
    output_path = os.path.join(current_dir, output_file)
    
    # Extract lessons and organize them
    lessons = extract_lesson_info(input_path)
    organized_content = organize_by_modules(lessons)
    
    # Create the organized markdown file
    create_organized_markdown(organized_content, input_path, output_path) 