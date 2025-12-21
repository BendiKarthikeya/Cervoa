#!/bin/bash

echo "🚀 Cervoa Airtable Setup Script"
echo "================================"
echo ""

# Check if base ID is provided
if [ -z "$1" ]; then
    echo "❌ ERROR: Base ID required"
    echo ""
    echo "📋 Steps:"
    echo "1. Go to: https://airtable.com/create"
    echo "2. Create a new base called 'Cervoa Demo'"
    echo "3. Copy the Base ID from URL (format: appXXXXXXXXXX)"
    echo "4. Run: ./setup-airtable.sh appXXXXXXXXXX"
    echo ""
    exit 1
fi

BASE_ID=$1

echo "📦 Base ID: $BASE_ID"
echo "🔄 Creating tables..."
echo ""

# Run the Node.js script
node create-airtable-tables.js $BASE_ID

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All done! Your Airtable base is ready."
    echo ""
    echo "📝 Next steps:"
    echo "1. Add Base ID to API_KEYS_PRIVATE.txt"
    echo "2. Get Apollo API key"
    echo "3. Import workflows to n8n"
    echo ""
else
    echo ""
    echo "❌ Setup failed. Check the errors above."
    echo ""
fi
