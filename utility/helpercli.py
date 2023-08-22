from PyInquirer import prompt
import json
import importlib

def load_menu(filename):
    with open(filename, 'r') as file:
        menu = json.load(file)
    return menu

def select_category(menu):
    questions = [
        {
            'type': 'list',
            'name': 'category',
            'message': 'Select a category:',
            'choices': [item['category'] for item in menu],
        }
    ]
    answers = prompt(questions)
    for item in menu:
        if item['category'] == answers['category']:
            return item

def select_submenu(category):
    questions = [
        {
            'type': 'list',
            'name': 'submenu',
            'message': f"Select a function in the '{category['category']}' category:",
            'choices': [item['name'] for item in category['submenus']],
        }
    ]
    answers = prompt(questions)
    for item in category['submenus']:
        if item['name'] == answers['submenu']:
            return item

def get_function_arguments(arguments):
    use_defaults = input("Use default values for all parameters? [Y/n]: ").lower()
    
    # If user pressed Enter without typing anything, or typed 'y' or 'Y', set use_defaults to 'y'
    if use_defaults in ('', 'y'):
        use_defaults = 'y'
    
    inputs = []
    for arg in arguments:
        default_value = arg.get('default', None)
        
        if use_defaults == 'y' and default_value is not None:
            # Use the default value without prompting the user
            inputs.append(default_value)
        else:
            # Prompt the user for this parameter, with the option to use the default value
            question = {
                'type': 'input',
                'name': arg['name'],
                'message': f"Enter value for {arg['name']} ({arg['type']})",
                'default': str(default_value) if default_value is not None else ''  # Convert to string or use empty string
            }
            answer = prompt([question])
            val = answer[arg['name']]
            
            if arg['type'] == 'int':
                val = int(val)
            elif arg['type'] == 'float':
                val = float(val)
                
            inputs.append(val)
            
    return inputs


def run_function(module_name, function_name, arguments):
    module = importlib.import_module(module_name)
    function = getattr(module, function_name)
    return function(*arguments)

def main():
    menu = load_menu('menu.json')
    category = select_category(menu)
    submenu = select_submenu(category)
    function_arguments = get_function_arguments(submenu['arguments'])
    result = run_function(submenu['module'], submenu['function'], function_arguments)
    print("Result:\n",result)

if __name__ == "__main__":
    main()
