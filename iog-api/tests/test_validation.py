import unittest
import pandas as pd
import pandera as pa
from iog_api.services.validation import validate_schema

class TestValidateSchema(unittest.TestCase):

    def setUp(self):
        # Define a simple schema
        self.schema = pa.DataFrameSchema({
            "column1": pa.Column(pa.Int),
            "column2": pa.Column(pa.String)
        })

        # Create valid and invalid dataframes
        self.valid_data = pd.DataFrame({
            "column1": [1, 2, 3],
            "column2": ["a", "b", "c"]
        })

        self.invalid_data = pd.DataFrame({
            "column1": [1, 2, "three"],  # Invalid entry in column1
            "column2": ["a", "b", "c"]
        })

    def test_valid_data(self):
        # Test with valid data
        self.assertTrue(validate_schema(self.schema, self.valid_data))

    def test_invalid_data(self):
        # Test with invalid data
        self.assertFalse(validate_schema(self.schema, self.invalid_data))

if __name__ == '__main__':
    unittest.main()